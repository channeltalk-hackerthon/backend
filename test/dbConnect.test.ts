import connectDB from "../src/db/connect";

test('test database connection', (done) => {
    connectDB
        .then(() => {
            done();
        })
        .catch((err) => {
            done(err)
        })
})