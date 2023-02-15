import express, {Express, Request, Response} from "express";
const session = require('express-session');

const app: Express = express();
const port = process.env.PORT;

const authRouter = require('./routes/auth');

//app.use('/', pageRouter);

app.use('/auth', authRouter);


app.get('/checkserver', (req: Request, res: Response) => {
    res.send("Server is running!");
})

app.listen(port, () => {
    console.log(`🏀 Server is Running at http://localhost:${port}`);
})