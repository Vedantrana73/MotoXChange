import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner'; // Import Sonner toast
import { Loader2 } from 'lucide-react'; // Import Lucide Loader2
import useUserStore from '../store/userStore.ts'; // Zustand store
import { Card, CardContent } from '../components/ui/card.tsx';
import { Textarea } from '../components/ui/textarea.tsx';
import { Button } from '../components/ui/button.tsx';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion.tsx';

function Contact() {
    // Get user data from Zustand store
    const { user } = useUserStore();

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const faqs = [
        { question: 'How do I list my car for sale?', answer: 'To list your car, sign up or log in, then navigate to the "Sell Your Car" section. Fill in the necessary details like car model, year, condition, price, and upload images. Your listing will be reviewed and posted.' },
        { question: 'Is there a fee for listing my car?', answer: 'No, listing your car on MotoXChange is completely free. However, we offer premium listing options for better visibility.' },
        { question: 'How do I contact a seller?', answer: "Simply visit the car listing you're interested in, and you will find a 'Contact Seller' button. You can send a direct message or request a callback from the seller." }
    ];

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('http://localhost:5000/api/query/add', {
                name: user.name,
                email: user.email,
                message,
            });

            toast.success('Message sent successfully!');
            setMessage(''); // Clear input field
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Header Section */}
            <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600 text-center mb-8">
                Have questions? Reach out to us! Whether you’re buying or selling, we're here to help.
            </p>

            {/* Contact Form */}
            <Card className="max-w-2xl mx-auto shadow-lg border border-gray-200">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Textarea
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your Message"
                            className="p-3 h-32"
                            required
                        />
                        <Button 
                            type="submit" 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Send Message'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* FAQ Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold text-center mb-4">FAQs</h2>
                <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto border border-gray-200 rounded-lg">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-300">
                            <AccordionTrigger className="text-lg font-medium p-4">{faq.question}</AccordionTrigger>
                            <AccordionContent className="p-4 text-gray-600">{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

export default Contact;
