import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import { config } from "dotenv";
import express, { Express, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import initProductDB from "./db/api/product/init";
import connectDB from "./db/connect";
import authRouter from "./router/auth/authRouter";
import isLoggedIn from "./router/auth/isLoggedIn";
import publicRouter from "./router/public/routes";
import passportConfig from "./utils/passport";
const cookieParser = require("cookie-parser"); // import from으로 하니까 안됨

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//load env variables from dotenv file
config();

//add express session. session database is mongodb
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3.6e6 * 24,
      domain:
        process.env.NODE_ENV === "production"
          ? "." + process.env.BASE_URL
          : undefined,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//register kakao oauth passport strategy
passportConfig();

connectDB
  .then(() => {
    console.log("👽 Connected to MongoDB 👽");
  })
  .catch((err) => {
    console.log("💩 Failed to connect to MongoDB 💩");
    throw new Error(err);
  });

initProductDB()
  .then(() => {
    console.log("😺 Initialize Product DB 😺");
  })
  .catch((err) => {
    console.log("🙀 Failed to initialize Product DB 🙀");
    throw new Error(err);
  });

app.get("/checkserver", (req: Request, res: Response) => {
  res.send("Server is running!");
});

app.use("/auth", authRouter);

app.use("/public", publicRouter); // routes to public apis

//test purpose
app.get("/loggedIn", isLoggedIn, (req: Request, res: Response) => {
  res.send(`You are logged in! User info: ${req.user}`);
});

app.get("/loginFail", (req: Request, res: Response) => {
  res.send(`Login Failed!!`);
});

app.listen(port, () => {
  console.log(`🏀 Server is Running at http://localhost:${port}`);
});
