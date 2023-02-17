import FundLog from "../../schema/fundLog";
import mongoose from "mongoose";

const createFundLog = (wishId: mongoose.Types.ObjectId, funder: mongoose.Types.ObjectId, currency: String, price: Number) => {
    
    //fund 가 valid한지 검사가 필요하다
    // ex. 목표 금액을 넘어서는지 체크!
    //currency가 올바른지 check! 등등
    
    const newfundlog = new FundLog({
        wishId: wishId,
        funder: funder,
        currency: currency,
        price: price,
    })

    return new Promise((res, rej) => {
        newfundlog
            .save()
            .then((doc) => {
                res(doc);
            })
            .catch((err) => {
                rej(err);
            })
    })
}

export default createFundLog