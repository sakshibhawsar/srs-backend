// connect to mongo db using mongoose
import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.LOCAL_URL);
        console.log(`MongoDB connected At: ${conn.connection.host}`);

    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}