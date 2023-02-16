import express, {Express, Request, Response} from "express";
import connectDB from "./db/connect";
import authRouter from "./router/auth/authRouter";
import passport from "passport";
import passportConfig from "./utils/passport";
import {config} from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app: Express = express();
const port = process.env.PORT;

//load env variables from dotenv file
config();

//add express session. session database is mongodb
app.use(
    session({
        secret: `${process.env.SESSION_SECRET}`,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
        }),
        cookie: {maxAge: 3.6e6*24},
    })
)
app.use(passport.initialize());
app.use(passport.session());


//register kakao oauth passport strategy
passportConfig();

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