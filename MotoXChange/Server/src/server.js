import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js'
import carRoutes from './routes/car.route.js'
dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/api/auth',userRoutes);
app.use('/api/cars',carRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
