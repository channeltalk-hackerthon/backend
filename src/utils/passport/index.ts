import passport from "passport";
import findUser from "../../db/api/user/find";
import register_kakaoStrategy from './kakao.strategy';
import mongoose from "mongoose";

const passportConfig = () => {
    passport.serializeUser((user: any, done) => {
        done(null, user._id);
    })

    passport.deserializeUser((userId: String, done) => {
        findUser(new mongoose.Types.ObjectId(`${userId}`))
            .then((user: any) => {
                done(null, user);
            })
            .catch((err) => {
                done(err);
            })
    })

    register_kakaoStrategy();
}

export default passportConfig