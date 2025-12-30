import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AdminUser } from "../models/adminUser.model";
import jwt from "jsonwebtoken";
import verifyToken, { AuthenticatedRequest } from "../middlewares/verifyToken";

export const adminUserRoutes = express.Router();

adminUserRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await AdminUser.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "30d" });
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
      },
    });
  } catch (error: any) {
    console.error("Error Login user:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to Login user",
      error: error.message || "Internal Server Error",
    });
  }
});

adminUserRoutes.get("/profile", verifyToken, async(req: AuthenticatedRequest, res: Response)=>{
  try {
    const user = await AdminUser.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
})

adminUserRoutes.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await AdminUser.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already taken" });
    }

    // Create and save new admin user
    const newUser = new AdminUser({ username, password });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
      },
    });
  } catch (error: any) {
    console.error("Error registering user:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message || "Internal Server Error",
    });
  }
});
