import express, { Request, Response } from "express";
import verifyToken from "../middlewares/verifyToken";
import { Blog } from "../models/blog.model";

export const blogRoute = express.Router();

/**
 * Add Blog
 */
blogRoute.post(
  "/add-blog",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { blogData } = req.body;
      const blog = await Blog.create(blogData);
      res.status(201).json({
        success: true,
        message: "Blog Added Successfully!",
        blog: blog,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to add blog",
        error: error.message || "Internal Server Error",
      });
    }
  }
);

/**
 * Get All Blogs
 */
blogRoute.get("/get-all-blogs", async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 }); // Sort by date, newest first
    res.status(200).json({
      success: true,
      message: "Get All Blogs!",
      blogs: blogs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get blogs",
      error: error.message || "Internal Server Error",
    });
  }
});

/**
 * Get Single Blog by ID
 */
blogRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ 
        success: false,
        message: "Blog not found" 
      });
    }
    res.status(200).json({
      success: true,
      message: "Blog retrieved successfully!",
      blog: blog,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get blog",
      error: error.message || "Internal Server Error",
    });
  }
});

/**
 * Get Blogs by Type
 */
blogRoute.get("/type/:type", async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const blogs = await Blog.find({ type: type }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      message: `Blogs of type '${type}' retrieved successfully!`,
      blogs: blogs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get blogs by type",
      error: error.message || "Internal Server Error",
    });
  }
});

/**
 * Get Blogs by Location
 */
blogRoute.get("/location/:location", async (req: Request, res: Response) => {
  try {
    const { location } = req.params;
    const blogs = await Blog.find({ location: location }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      message: `Blogs from '${location}' retrieved successfully!`,
      blogs: blogs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get blogs by location",
      error: error.message || "Internal Server Error",
    });
  }
});

/**
 * Search Blogs by Title or Tags
 */
blogRoute.get("/search/:query", async (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
        { summary: { $regex: query, $options: "i" } }
      ]
    }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      message: `Search results for '${query}'`,
      blogs: blogs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to search blogs",
      error: error.message || "Internal Server Error",
    });
  }
});

/**
 * Update Blog
 */
blogRoute.put(
  "/update-blog/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { updateData } = req.body;
      const blog = await Blog.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!blog) {
        return res.status(404).json({ 
          success: false,
          message: "Blog not found" 
        });
      }
      res.status(200).json({
        success: true,
        message: "Blog updated successfully!",
        blog: blog,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to update blog",
        error: error.message || "Internal Server Error",
      });
    }
  }
);

/**
 * Delete Blog
 */
blogRoute.delete(
  "/delete-blog/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findByIdAndDelete(id);
      if (!blog) {
        return res.status(404).json({ 
          success: false,
          message: "Blog not found" 
        });
      }
      res.status(200).json({
        success: true,
        message: "Blog deleted successfully!",
        blog: blog,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to delete blog",
        error: error.message || "Internal Server Error",
      });
    }
  }
);

/**
 * Get Blog Statistics
 */
blogRoute.get("/stats/overview", verifyToken, async (req: Request, res: Response) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const blogsByType = await Blog.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);
    const blogsByLocation = await Blog.aggregate([
      { $group: { _id: "$location", count: { $sum: 1 } } }
    ]);
    
    res.status(200).json({
      success: true,
      message: "Blog statistics retrieved successfully!",
      stats: {
        totalBlogs,
        blogsByType,
        blogsByLocation
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get blog statistics",
      error: error.message || "Internal Server Error",
    });
  }
});

/**
 * Get Recent Blogs (Last 10)
 */
blogRoute.get("/recent/latest", async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 }).limit(3);
    res.status(200).json({
      success: true,
      message: "Recent blogs retrieved successfully!",
      blogs: blogs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get recent blogs",
      error: error.message || "Internal Server Error",
    });
  }
});