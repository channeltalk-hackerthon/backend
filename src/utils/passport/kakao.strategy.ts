import passport from "passport";
import { Strategy } from "passport-kakao";
import createUser from "../../db/api/user/create";
import userExists from "../../db/api/user/exists";
import findUserBySns from "../../db/api/user/findbySns";

const AgeRecord = {
  "1~9": 0,
  "10~14": 1,
  "15~19": 2,
  "20~29": 3,
  "30~39": 4,
  "40~49": 5,
  "50~59": 6,
  "60~69": 7,
  "70~79": 8,
  "80~89": 9,
  "90~": 10,
};

const register_kakaoStrategy = () => {
  passport.use(
    new Strategy(
      {
        clientID: `${process.env.KAKAO_RESTAPI_KEY}`,
        callbackURL: "/auth/kakao/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        const provider = "kakao";
        const snsId = profile.id;
        const ageRange =
          AgeRecord[
            profile._json.kakao_account.age_range as keyof typeof AgeRecord
          ];
        const gender = profile._json.kakao_account.gender;
        userExists(provider, snsId)
          .then((result) => {
            if (result == true) {
              //user exists in database.
              //login user!
              return findUserBySns(provider, snsId);
            } else {
              //user doesnt exists in database
              //register user!
              return createUser(
                "random name",
                provider,
                snsId,
                ageRange,
                gender
              );
            }
          })
          .then((user) => {
            done(null, user);
          })
          .catch((err) => {
            console.log(err);
            done(err);
          });
      }
    )
  );
};

export default register_kakaoStrategy;
