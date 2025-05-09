import { Student } from "../models/studen.model.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const adminlogin = async (req, res) => {
    try {
        const { name, secretkey } = req.body
        if (name == "udit" && secretkey == "sdits") {
            res.status(200).json({ message: "Login Successfull" })
        }
        else {
            res.status(401).json({ message: "Login Failed" })
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err })
    }
}

const approvebyadmin = async (req, res) => {
    try {
        const studentId = req.params.id;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (student.isApproved) {
            return res.status(400).json({ message: "Student already approved" });
        }

        //  Generate password using last 2 digits of enrollment + lowercase name
        const lastTwoDigits = student.enrollmentnumber.slice(-2);
        const lowercaseName = student.name.toLowerCase();
        const generatedPassword = `${lowercaseName}${lastTwoDigits}`; // e.g., "udit78"

        //  Hash the password
        const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

        // Update student data
        student.password = hashedPassword;
        student.isApproved = true;

        await student.save();

        //  Send the generated password via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS // Use Gmail App Password
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: student.email,
            subject: 'Your Student Account is Approved!',
            text: `Hello ${student.name},\n\nYour account has been approved.\n\nYour password is: ${generatedPassword}\n\nPlease log in using your email and this password.\n`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Student approved and password sent via email." });

    } catch (err) {
        console.error("Approval error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

export default { approvebyadmin, adminlogin };