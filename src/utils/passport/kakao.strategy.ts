import { Strategy } from "passport-kakao";
import passport from "passport";
import findUserBySns from "../../db/api/user/findbySns";
import userExists from '../../db/api/user/exists';
import createUser from "../../db/api/user/create";

const kakao_passport = () => {
    passport.use(
        new Strategy({
            clientID: `${process.env.KAKAO_RESTAPI_KEY}`,
            callbackURL: '/auth/kakao/callback',
        }, (accessToken, refreshToken, profile, done) => {
            const provider = "kakao";
            const snsId = profile.id;
            userExists(provider, snsId)
                .then((result) => {
                    if(result == true) {
                        //user exists in database. 
                        //login user!
                        return findUserBySns(provider, snsId);
                    } else {
                        //user doesnt exists in database
                        //register user!
                        return createUser("random name", provider, snsId);
                    }
                })
                .then((user) => {
                    done(null, user);
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                })
        })
    )
}

export default kakao_passport;