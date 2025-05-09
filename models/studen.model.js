import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: { type: String, },
    enrollmentnumber: { type: String },
    course: String,
    password: String,
    isApproved: { type: Boolean, default: false },
    address: String,
    phone: String,
    aadharCardNumber: { type: String, }, // Aadhar should be unique!
    marks10th: Number,
    marks12th: Number,
    eventCertificates: [String], // Array to store certificates (as URLs or file names)

},
    { timestamps: true }
);
export const Student = mongoose.model("Student", studentSchema);
