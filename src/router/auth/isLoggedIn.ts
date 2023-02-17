import express, {Express, NextFunction, Request, Response} from "express";

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if(req.user) {
        next();
    } else {
        res.redirect('/auth/kakao');
    }
}

export default isLoggedIn;