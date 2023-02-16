import express, {Router, Request, Response, NextFunction} from 'express';
import passport from 'passport';
import { nextTick } from 'process';
const authRouter: Router = express.Router();

authRouter.get('/kakao', passport.authenticate('kakao'));

authRouter.get('/kakao/callback', passport.authenticate('kakao', 
    {
        failureRedirect: '/failed',
    }), (req: Request, res: Response) => {
        res.redirect('/checkuser')
    });

authRouter.post('/kakao/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if(err) {return res.redirect('/failed')}
    });
    req.session.destroy((err) => {
        if(err) {return res.redirect('/failed')}
    });
    res.redirect('/checkserver');
})

export default authRouter;