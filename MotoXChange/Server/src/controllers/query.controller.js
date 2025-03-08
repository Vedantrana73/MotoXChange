import Query from "../models/query.model.js";
import sendEmail from "../utils/email.js";
import { generateQueryNotificationEmail, generateQueryAcknowledgmentEmail,generateQueryResolvedEmail } from "../utils/emailTemplate.js";

const owners = [
    { name: "Vedant Rana", email: "vedantranayt@gmail.com" },
    { name: "Akshat Gohil", email: "akshatgohil4243@gmail.com" }
];

export const addQuery = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newQuery = new Query({ name, email, message });
        await newQuery.save();

        // Send email to MotoXChange owners (async, does not block response)
        sendEmail(
            owners.map(owner => owner.email).join(","), // Send to all owners
            "New Query Submitted on MotoXChange",
            `New query received from ${name}`,
            generateQueryNotificationEmail(newQuery)
        ).catch(error => console.error("Error sending owner email:", error));

        // Await acknowledgment email to the user (ensuring it is sent before responding)
        await sendEmail(
            email,
            "MotoXChange: We Have Received Your Query",
            `Hello ${name}, we have received your query and will get back to you soon.`,
            generateQueryAcknowledgmentEmail(name)
        );

        res.status(201).json({ success: true, message: "Query submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getAllQueries = async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 }); // Sort by latest
        res.status(200).json(queries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching queries', error: error.message });
    }
};


export const resolveQuery = async (req, res) => {
    try {
        const { id } = req.params;

        const query = await Query.findById(id);
        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }

        // Update the query status
        query.status = 'resolved';
        await query.save();

        // Generate email content
        const emailSubject = 'Your Query Has Been Resolved - MotoXChange';
        const emailHtml = generateQueryResolvedEmail(query.name);

        // Send email notification to user
        await sendEmail(query.email, emailSubject, 'Your query has been resolved.', emailHtml);

        res.status(200).json({ message: 'Query marked as resolved and email sent successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating query status', error });
    }
};
