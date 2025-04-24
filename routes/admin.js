import express from "express";
import adminController from "../controllers/admin.controller.js";
export const adminrouter = express.Router();

// Admin login route
// This route is used for admin login. It accepts a POST request with admin credentials in the body.
adminrouter.route("/admin-login")
    .post(adminController.adminlogin)
// Approve student and send email with generated password
adminrouter.route("/approve-student/:id")
    .put(adminController.approvebyadmin)