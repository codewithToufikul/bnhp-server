import express, { Application, Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { adminUserRoutes } from './app/controller/adminUser.controller';
import { newsRoute } from './app/controller/news.controller';
import { eventsRoute } from './app/controller/events.controller';
import { sliderRoute } from './app/controller/slider.controller';
import { blogRoute } from './app/controller/blog.controller';


const app: Application = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5174",
  credentials: true
}));
dotenv.config();

app.use("/adminUser", adminUserRoutes);
app.use("/news", newsRoute);
app.use("/events", eventsRoute);
app.use("/slider", sliderRoute);
app.use("/api/blogs/", blogRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Api is running');
});


export default app;