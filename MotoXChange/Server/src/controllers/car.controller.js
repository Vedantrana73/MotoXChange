import {Car} from '../models/car.model.js';
import { User } from '../models/user.model.js';

export const getCarsByOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;

        // Find all cars where owner matches ownerId
        const cars = await Car.find({ owner: ownerId });

        if (!cars.length) {
            return res.status(404).json({ message: "No cars found for this owner!" });
        }

        return res.status(200).json({ cars });
    } catch (error) {
        console.error("Error fetching cars by owner: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const addCar = async (req, res) => {
    const { description, brand, model, year, price, fuelType, transmission, mileage, location, images, owner, seats, features } = req.body;

    // Validate required fields
    if (!description || !brand || !model || !year || !price || !fuelType || !transmission || !mileage || !location || !images || !owner || !seats || !features) {
        return res.status(400).json({ message: "All Fields Are Required!" });
    }

    try {
        // Create a new car instance
        const newCar = new Car({
            description,
            brand,
            model,
            year,
            price,
            fuelType,
            transmission,
            mileage,
            location,
            images,
            owner,
            seats,
            features
        });

        // Save the new car in the database
        const savedCar = await newCar.save();

        // Find the user and update their listedCars array
        const updatedUser = await User.findByIdAndUpdate(owner, 
            { $push: { listedCars: savedCar._id } }, 
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Owner not found!" });
        }

        return res.status(200).json({ message: "Car Listed Successfully!", car: savedCar });
    } catch (error) {
        console.error("Error Occurred While Adding Car: ", error);
        return res.status(500).json({ message: "Internal Server Error Occurred" });
    }
};

export const findByLocation = async(req,res) => {
    const {state,city} = req.params;
    if(!state|| !city)
    {
        return res.status(400).json({message: "Please Provide Correct Location"});
    }

    try
    {
        const fetchedCars = await Car.find({ "location.state": state, "location.city": city });
        if(fetchedCars.length===0)
        {
            return res.status(204).json({message: "No Cars Found For the Specified Location"});
        }
        
        res.status(200).json(fetchedCars);
    }
    catch(error)
    {
        console.log("Error Occured While Finding Cars By Location with Location: "+state+" "+city+" "+error);
        res.status(500).json({message: "Internal Server Error Occured"});
    }
}

export const viewCarById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Please Provide Correct Car Id" });
    }

    try {
        const fetchedCar = await Car.findById(id)
            .populate({ path: "owner", select: "name email phone" }) // Populate only name, email, and phone of owner
            

        if (!fetchedCar) {
            return res.status(204).json({ message: "No Car Found For the Specified Id" });
        }

        res.status(200).json(fetchedCar);
    } catch (error) {
        console.error(`Error Occurred While Finding Car By Id: ${id}`, error);
        res.status(500).json({ message: "Internal Server Error Occurred" });
    }
};

export const deleteCar = async (req, res) => {
    const { carId } = req.params;

    if (!carId) {
        return res.status(400).json({ message: "Please provide a valid Car ID" });
    }

    try {
        // Find the car before deleting to get the owner ID
        const carToDelete = await Car.findById(carId);

        if (!carToDelete) {
            return res.status(404).json({ message: "Car not found!" });
        }

        // Delete the car
        await Car.findByIdAndDelete(carId);

        // Remove the car ID from the owner's listedCars array
        await User.findByIdAndUpdate(carToDelete.owner, 
            { $pull: { listedCars: carId } }, 
            { new: true }
        );

        return res.status(200).json({ message: "Car deleted successfully!" });
    } catch (error) {
        console.error("Error deleting car:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
