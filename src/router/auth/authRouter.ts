import express, {Router, Request, Response, NextFunction} from 'express';
import passport from 'passport';
import {logOut, destroySession} from './logOut';
const authRouter: Router = express.Router();

authRouter.get('/kakao', passport.authenticate('kakao'));

authRouter.get('/kakao/callback', passport.authenticate('kakao', 
    {
        failureRedirect: '/loginFail',
    }), (req: Request, res: Response) => {
        res.redirect('/loggedIn')
    });

authRouter.get('/kakao/logout', (req: Request, res: Response, next: NextFunction) => {
    logOut(req)
        .then(() => {
            return destroySession(req);
        })
        .then(() => {
            res.clearCookie('connect.sid')
            res.redirect('/');
        })
        .catch(() => {
            res.redirect('/logouterr')
        })
})

export default authRouter;