import mongoose from "mongoose";
import createUser from "../src/db/api/user/create";
import findUser from "../src/db/api/user/find";
import findUserBySns from "../src/db/api/user/findbySns";
import userExists from "../src/db/api/user/exists";
import connectDB from "../src/db/connect"
import deleteUser from "../src/db/api/user/delete";

beforeAll((done) => {
    connectDB
        .then(() => {
            done();
        }
        )
        .catch((err) => {
            done(err);
        })
})

test("create user in database and find", (done) => {
    createUser("testname1", "kakao", "kakaoId1")
        .then((doc) => {
            done();
        })
        .catch((err) => {
            done(err);
        })
})

test("find user by userid in database", (done) => {
    createUser("testname2", "kakao", "kakaoId2")
        .then((doc: any) => {
            const userId = doc._id;
            return findUser(userId)
        })
        .then((user) => {
            done();
        })
        .catch((err) => {
            done(err)
        })
})

test("find user by provider and snsId in database", (done) => {
    createUser("testname3", "kakao", "kakaoId3")
        .then((doc: any) => {
            const provider = doc.provider;
            const snsId = doc.snsId;
            return findUserBySns(provider, snsId)
        })
        .then((user) => {
            done();
        })
        .catch((err) => {
            done(err)
        })
})

test("check if user exists by provider and snsId in database", (done) => {
    createUser("testname4", "kakao", "kakaoId4")
        .then((doc: any) => {
            const provider = doc.provider;
            const snsId = doc.snsId;
            return userExists(provider, snsId);
        })
        .then((result) => {
            if (result == true) {
                done()
            } else {
                done("user exists should return true")
            }
        })
        .catch((err) => {
            done(err);
        })
})

test("check if user is not existing in database", (done) => {
    const provider = "kakao";
    const snsId = "kakaoId999";
    userExists(provider, snsId)
        .then((result) => {
            if (result == true) {
                done("user exists method must return false. user cant exist!");
            } else if (result == false ){
                done();
            } else {
                done("result must be boolean.");
            }
        })
        .catch((err) => {
            done(err);
        })
})

test("delete user from database", (done) => {
    createUser("testname5", "kakao", "kakaoId5")
        .then((doc: any) => {
            const userId = doc._id;
            return findUser(userId)
        })
        .then((usr: any) => {
            const userId = usr._id;
            return deleteUser(userId);
        })
        .then(() => {
            done();
        })
        .catch((err) => {
            done(err);
        })
})


afterAll(async () => {
    const conn = mongoose.createConnection(`${process.env.MONGO_URL}`)
    await conn.dropDatabase();
})