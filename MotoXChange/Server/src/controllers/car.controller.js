import {Car} from '../models/car.model.js';

export const addCar = async(req,res) => {
    const { description, brand, model, year, price, fuelType, transmission, mileage, location, images, owner, seats, features} = req.body;
    if( !description || !brand || !model || !year || !price || !fuelType || !transmission || !mileage || !location || !images || !owner || !seats || !features)
    {
        return res.status(400).json({message: "All Fields Are Required!"});
    }

    try
    {
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
        
        await newCar.save();
        return res.status(200).json({message: "Car Listed Successfully!"});
    }
    catch(error)
    {
        console.log("Error Occured While Adding Car "+error);
        return res.status(500).json({message: "Internal Server Error Occured"});
    }
}

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
