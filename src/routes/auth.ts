import express, {Express, Request, Response, Router} from "express";

const app: Express = express();

const router: Router = express.Router();
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use('kakao', new KakaoStrategy({
    clientID: '35c9645f9ed3eff0949728f97e4ca91d',
    callbackURL: '/auth/kakao/callback', // 위에서 설정한 redirect URI
}, async (accessToken:any, refreshToken:any, profile:any, done:any) => {
    console.log(accessToken);
    console.log(refreshToken);
    // let user = {
    //     profile: profile._json,
    //     accessToken: accessToken
    // }
    // return done(null, user);
}))

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback',
passport.authenticate('kakao', {
    failureRedirect: '/',
}), (res:Response, req:Request) => {
    res.redirect('/');
}
)

module.exports = router;