import express from "express";
import studentController from "../controllers/student.controller.js";
export const Studentrouter = express.Router();


//register student 
Studentrouter.route("/register")
    .get(studentController.getallstudents)
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
