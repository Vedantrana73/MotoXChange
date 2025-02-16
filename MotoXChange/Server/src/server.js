import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js'
dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(cors());

app.use('/api/auth',userRoutes);

const PORT = process.env.PORT;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
