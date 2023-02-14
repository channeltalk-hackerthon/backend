import express, {Express, Request, Response} from "express";

const app: Express = express();
const port = process.env.PORT;

app.get('/checkserver', (req: Request, res: Response) => {
    res.send("Server is running!");
})

app.listen(port, () => {
    console.log(`🏀 Server is Running at http://localhost:${port}`);
})