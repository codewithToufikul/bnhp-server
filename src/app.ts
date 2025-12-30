import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { adminUserRoutes } from "./app/controller/adminUser.controller";
import { newsRoute } from "./app/controller/news.controller";
import { eventsRoute } from "./app/controller/events.controller";
import { sliderRoute } from "./app/controller/slider.controller";
import { blogRoute } from "./app/controller/blog.controller";

dotenv.config();

const app: Application = express();

/**
 * CORS CONFIG (VERY IMPORTANT)
 */
app.use(
  cors({
    origin: ["http://localhost:5174", "https://bnhp-client.vercel.app"],
    credentials: true, // allow cookies / auth tokens
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// allow preflight requests globally
app.options("*", cors());

/**
 * BODY PARSER
 */
app.use(express.json());

/**
 * ROUTES
 */
app.use("/adminUser", adminUserRoutes);
app.use("/news", newsRoute);
app.use("/events", eventsRoute);
app.use("/slider", sliderRoute);
app.use("/api/blogs", blogRoute);

/**
 * ROOT
 */
app.get("/", (req: Request, res: Response) => {
  res.send("API is running 😎");
});

export default app;
