import express from "express";
import studentController from "../controllers/student.controller.js";
export const Studentrouter = express.Router();


//register student 
Studentrouter.route("/register")
    .post(studentController.registerstudent);

//login student
Studentrouter.route("/login")
    .post(studentController.loginstudent)
//get all pending students
Studentrouter.route("/pending-students")
    .get(studentController.pendingstudent)
//approve student by admin
Studentrouter.route("/approved-students")
    .get(studentController.approvedstudents);
//delete student by admin
Studentrouter.route("/delete-student/:id")
    .delete(studentController.deletestudentbyId);

//other details of student
// Studentrouter.route("/update-additional-details/:id")
//     .put(studentController.updateAdditionalDetails);
//add other details of student
// Studentrouter.route("/add-other-details")
//     .post(studentController.addotherdetails);
//get personal details of student
Studentrouter.route("/personal-details/:id")
    .post(studentController.personalDetails);