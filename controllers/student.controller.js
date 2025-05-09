// File: controllers/student.controller.js
import { Student } from "../models/studen.model.js"; // Make sure filename is correct
import bcrypt from "bcrypt";





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
                lastname: student.lastname,
                email: student.email,
                enrollmentnumber: student.enrollmentnumber,
                course: student.course,
                isApproved: student.isApproved,
                phone: student.phone,
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


// const addotherdetails = async (req, res) => {
// }
// const updateAdditionalDetails = async (req, res) => {


//     const { id } = req.params;
//     const { address, phone, aadharCardNumber, marks10th, marks12th, eventCertificates } = req.body;

//     try {
//         const updatedStudent = await Student.findByIdAndUpdate(
//             id,
//             {
//                 $set: {
//                     'additionalDetails.address': address,
//                     'additionalDetails.phone': phone,
//                     'additionalDetails.aadharCardNumber': aadharCardNumber,
//                     'additionalDetails.marks10th': marks10th,
//                     'additionalDetails.marks12th': marks12th,
//                     'additionalDetails.eventCertificates': eventCertificates,
//                 }
//             },
//             { new: true }
//         );

//         if (!updatedStudent) {
//             return res.status(404).json({ message: "Student not found" });
//         }

//         res.status(200).json(updatedStudent);
//     } catch (error) {
//         console.error('Error updating additional details:', error);
//         res.status(500).json({ message: "Server error" });
//     }
// }

const personalDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }



        console.log(
            student
        )
        const personalDetails = new Student(
            {
                enrollmentnumber: student.enrollmentnumber,
                address: req.body.address,
                phone: req.body.phone,
                aadharCardNumber: req.body.aadharCardNumber,
                marks10th: req.body.marks10th,
                marks12th: req.body.marks12th,
                eventCertificates: req.body.eventCertificates,
            }
        );
        const savedDetails = await personalDetails.save();
        if (savedDetails) {
            res.status(201).json(savedDetails);
        }

    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
}
export default { registerstudent, loginstudent, pendingstudent, approvedstudents, deletestudentbyId, personalDetails };
