import express, { Request, Response } from "express";
import verifyToken from "../middlewares/verifyToken";
import { Slider } from "../models/slider.model";

export const sliderRoute = express.Router();

/**
 * Add Slider
 */
sliderRoute.post(
  "/add-slider",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { sliderData } = req.body;
      const slider = await Slider.create(sliderData);
      res.status(201).json({
        success: true,
        message: "Slider Added Successfully!",
        slider: slider,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to add slider",
        error: error.message || "Internal Server Error",
      });
    }
  }
);

/**
 * Get All Sliders
 */
sliderRoute.get("/get-all-sliders", async (req: Request, res: Response) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json({
      success: true,
      message: "Get All Sliders!",
      sliders: sliders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get sliders",
      error: error.message || "Internal Server Error",
    });
  }
});

/**
 * Get Single Slider by ID
 */
sliderRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findById(id);
    if (!slider) {
      return res.status(404).json({ message: "Slider not found" });
    }
    res.status(200).json({
      success: true,
      message: "Slider retrieved successfully!",
      slider: slider,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get slider",
      error: error.message || "Internal Server Error",
    });
  }
});

/**
 * Update Slider
 */
sliderRoute.put(
  "/update-slider/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { updateData } = req.body;
      const slider = await Slider.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!slider) {
        return res.status(404).json({ message: "Slider not found" });
      }
      res.status(200).json({
        success: true,
        message: "Slider updated successfully!",
        slider: slider,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to update slider",
        error: error.message || "Internal Server Error",
      });
    }
  }
);

/**
 * Delete Slider
 */
sliderRoute.delete(
  "/delete-slider/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const slider = await Slider.findByIdAndDelete(id);
      if (!slider) {
        return res.status(404).json({ message: "Slider not found" });
      }
      res.status(200).json({
        success: true,
        message: "Slider deleted successfully!",
        slider: slider,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to delete slider",
        error: error.message || "Internal Server Error",
      });
    }
  }
);