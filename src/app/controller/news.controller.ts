import express, { Request, Response } from "express";
import dotenv from "dotenv";
import verifyToken from "../middlewares/verifyToken";
import { News } from "../models/news.model";

export const newsRoute = express.Router();

newsRoute.post(
  "/add-news",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { newsData } = req.body;
      const news = await News.create(newsData);
      res.status(201).json({
        success: true,
        message: "News Added Succesfullly !",
        news: news,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to add news",
        error: error.message || "Internal Server Error",
      });
    }
  }
);

newsRoute.get("/get-all-news", async (req: Request, res: Response) => {
  try {
    const news = await News.find();
    res.status(201).json({
      success: true,
      message: "Get All News!",
      news: news,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get news",
      error: error.message || "Internal Server Error",
    });
  }
});

newsRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(201).json({
      success: true,
      message: "News Successfully get!",
      news: news,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get news",
      error: error.message || "Internal Server Error",
    });
  }
});

newsRoute.put(
  "/update-news/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { updateData } = req.body;
      const news = await News.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      res.status(201).json({
        success: true,
        message: "News update Successfully!",
        news: news,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to update news",
        error: error.message || "Internal Server Error",
      });
    }
  }
);

newsRoute.delete(
  "/delete-news/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const news = await News.findByIdAndDelete(id);
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      res.status(201).json({
        success: true,
        message: "News delete Successfully!",
        news: news,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to delete news",
        error: error.message || "Internal Server Error",
      });
    }
  }
);
