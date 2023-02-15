import {connect} from 'mongoose';

const connectDB = new Promise((res, rej) => {
    connect(`${process.env.MONGO_URL}`)
        .then(() => {
            res(void 0)
        })
        .catch((err) => rej(err))
})
 
export default connectDB;