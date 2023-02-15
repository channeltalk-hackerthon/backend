import mongoose, { ObjectId } from "mongoose";
import { isErrored } from "stream";
import createUser from "../src/db/api/user/create";
import createWish from "../src/db/api/wish/create";
import deleteWish from "../src/db/api/wish/delete";
import readWish from "../src/db/api/wish/read";
import connectDB from "../src/db/connect"
import pushUserwish from "../src/db/api/user/pushUserwish";
import updateWish from "../src/db/api/wish/update";

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

test("create wish", (done) => {
    createUser("testname1", "kakao", "kakaoId1")
        .then((doc: any) => {
            const userId = doc._id;
            const product_id = userId;
            return createWish(userId, "test", product_id, "this is test", "KRW", 10000.0, new Date());
        })
        .then((wish: any) => {
            done();
        })
        .catch((err) =>{
            done(err);
        })
})

test("delete wish", (done) => {
    createUser("testname2", "kakao", "kakaoId2")
        .then((doc: any) => {
            const userId = doc._id;
            const product_id = userId;
            return createWish(userId, "test2", product_id, "this is test", "KRW", 10000.0, new Date());
        })
        .then((wish: any) => {
            const wishId = wish._id;
            const owner = wish.owner
            return deleteWish(owner, wishId);
        })
        .then(() => {
            done();
        })
        .catch((err) => {
            done(isErrored);
        })
})

test("read wish list", (done) => {
    createUser("testname3", "kakao", "kakaoId3")
        .then((doc: any) => {
            const userId = doc._id;
            const product_id = userId;
            return createWish(userId, "test3", product_id, "this is test", "KRW", 10000.0, new Date())
        })
        .then((wish: any) => {
            const userId = wish.owner;
            const wishId = wish._id;
            return pushUserwish(userId, wishId)
                .then((doc) => {
                    return readWish(userId);
                })
                .catch((err) => {
                    done(err);
                })
        })
        .then((wishlist: any) => {
            if(wishlist.length == 1) {
                done()
            } else {
                done("wishes are not added to user wishlist")
            }
        })
        .catch((err) => {
            done(err);
        })
})

test("update wish policy", (done) => {
    createUser("testname4", "kakao", "kakaoId4")
        .then((doc: any) => {
            const userId = doc._id;
            const product_id = userId;
            return createWish(userId, "test4", product_id, "this is test", "KRW", 10000.0, new Date())
        })
        .then((wish: any) => {
            const userId = wish.owner;
            const wishId = wish._id;
            return pushUserwish(userId, wishId)
                .then((doc) => {
                    return wish
                })
                .catch((err) => {
                    done(err);
                })
        })
        .then((wish: any) => {
            return updateWish(wish.owner, wish._id, "update product name", "update description", new Date(), "inactive")
                .then((doc) => {
                    return wish.owner
                })
                .catch((err) => {
                    done(err);
                })
        })
        .then((owner) => {
            return readWish(owner);
        })
        .then((wishlist: any) => {
            const wish = wishlist[0];
            if(wish.product_name == "update product name" && wish.description == "update description" && wish.status == "inactive") {
                done();
            } else {
                done("Wish is not updated");
            }
        })
        .catch((err) => {
            done(err);
        })
})

afterAll(async () => {
    const conn = mongoose.createConnection(`${process.env.MONGO_URL}`)
    await conn.dropDatabase();
})