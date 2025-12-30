import express, { Request, Response } from "express";
import verifyToken from "../middlewares/verifyToken";
import { Event } from "../models/events.model";

export const eventsRoute = express.Router();

/**
 * Add Event
 */
eventsRoute.post(
  "/add-event",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { eventData } = req.body;
      const event = await Event.create(eventData);
      res.status(201).json({
        success: true,
        message: "Event Added Successfully!",
        event: event,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to add event",
        error: error.message || "Internal Server Error",
      });
    }
  }
);

/**
 * Get All Events
 */
eventsRoute.get("/get-all-events", async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      message: "Get All Events!",
      events: events,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get events",
      error: error.message || "Internal Server Error",
    });
  }
});

/**
 * Get Single Event by ID
 */
eventsRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({
      success: true,
      message: "Event retrieved successfully!",
      event: event,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get event",
      error: error.message || "Internal Server Error",
    });
  }
});

/**
 * Update Event
 */
eventsRoute.put(
  "/update-event/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { updateData } = req.body;
      const event = await Event.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json({
        success: true,
        message: "Event updated successfully!",
        event: event,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to update event",
        error: error.message || "Internal Server Error",
      });
    }
  }
);

/**
 * Delete Event
 */
eventsRoute.delete(
  "/delete-event/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const event = await Event.findByIdAndDelete(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json({
        success: true,
        message: "Event deleted successfully!",
        event: event,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to delete event",
        error: error.message || "Internal Server Error",
      });
    }
  }
);
