import express, {Router, Request, Response} from 'express';
import passport from 'passport';
import passportConfig from '../../utils/passport/index';
passportConfig();

const authRouter: Router = express.Router();

authRouter.get('/kakao', passport.authenticate('kakao'));

authRouter.get('/kakao/callback', passport.authenticate('kakao', 
    {
        failureRedirect: '/checkserver',
        successRedirect: '/checkserver',
    }));

export default authRouter;