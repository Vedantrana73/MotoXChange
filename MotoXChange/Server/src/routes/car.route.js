import express from "express";
import { addCar , findByLocation, getCarsByOwner, viewCarById, deleteCar } from "../controllers/car.controller.js";

const router = express.Router();

router.post('/add',addCar);

router.get('/fetch/:state/:city',findByLocation);

router.get('/:id', viewCarById);

router.get("/owner/:ownerId",getCarsByOwner);

router.delete("/delete/:carId", deleteCar);

export default router;