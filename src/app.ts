import express, { Application, Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";


const app: Application = express();
app.use(express.json());
app.use(cors());
dotenv.config();


app.get('/', (req: Request, res: Response) => {
    res.send('Api is running');
});


export default app;