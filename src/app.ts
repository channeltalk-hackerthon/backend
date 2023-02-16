
import express, {Express, Request, Response} from "express";
import connectDB from "./db/connect";
import authRouter from './routes/auth';

const app: Express = express();
const port = process.env.PORT;

connectDB
    .then(() => {
        console.log("👽 Connected to MongoDB 👽")
    })
    .catch((err) => {
        console.log("💩 Failed to connect to MongoDB 💩")
        throw new Error(err);
    })

app.get('/checkserver', (req: Request, res: Response) => {
    res.send("Server is running!");
})

app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`🏀 Server is Running at http://localhost:${port}`);
})