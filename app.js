import express from 'express';
import { Studentrouter } from './routes/student.js';
import dotenv from 'dotenv';
import { connectDB } from './config/mongodb.connect.js';
import { adminrouter } from './routes/admin.js';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())
app.use("/App", Studentrouter)
app.use("/App", adminrouter)
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})