// File: controllers/student.controller.js
import { Student } from "../models/studen.model.js"; // Make sure filename is correct
import bcrypt from "bcrypt";
const getallstudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students)

    }
    catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

const registerstudent = async (req, res) => {
    try {
        const { email, enrollmentnumber } = req.body;

        const existingemail = await Student.findOne({ email });
        if (existingemail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const existingEnrollment = await Student.findOne({ enrollmentnumber });
        if (existingEnrollment) {
            return res.status(400).json({ message: "Enrollment already exists" });
        }

        const student = new Student(req.body);
        const savedStudent = await student.save();
        if (savedStudent) {
            res.status(201).json(savedStudent);
        }
    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
}
const loginstudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find student by email
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // 2. Check if student is approved
        if (!student.isApproved) {
            return res.status(403).json({ message: "Account not approved yet" });
        }

        // 3. Check if password is set by admin
        if (!student.password) {
            return res.status(403).json({ message: "Password not set. Please contact admin" });
        }

        // 4. Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 5. Success
        res.status(200).json({
            message: "Login successful",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                enrollmentnumber: student.enrollmentnumber
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
const pendingstudent = async (req, res) => {
    try {
        const pending = await Student.find({ isApproved: false });
        res.status(200).json(pending);
    } catch (err) {
        res.status(500).json({ message: "Error fetching pending students", error: err.message });
    }
}

const approvedstudents = async (req, res) => {
    try {
        const approvedStudents = await Student.find({ isApproved: true });
        res.status(200).json(approvedStudents);
    } catch (error) {
        console.error("Error fetching approved students:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const deletestudentbyId = async (req, res) => {
    try {
        const studentId = req.params.id;

        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully", deletedStudent });
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
export default { getallstudents, registerstudent, loginstudent, pendingstudent, approvedstudents, deletestudentbyId };
