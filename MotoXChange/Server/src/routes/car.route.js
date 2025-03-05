import express from "express";
import { addCar , findByLocation, viewCarById } from "../controllers/car.controller.js";

const router = express.Router();

router.post('/add',addCar);

router.get('/fetch/:state/:city',findByLocation);

router.get('/:id', viewCarById);

export default router;