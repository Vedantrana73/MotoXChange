import express from "express";
import { sendOtp,verifyOtp,loginUser } from "../controllers/user.controller.js";
const router = express.Router();

router.post('/send-otp',sendOtp);

router.post('/verify-otp',verifyOtp);

router.post('/login',loginUser);

export default router;