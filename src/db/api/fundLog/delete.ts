import mongoose from 'mongoose';
import FundLog from '../../schema/fundLog';

const deleteFundLog = (fundLogId: mongoose.Types.ObjectId) => {
    return new Promise((res, rej) => {
        FundLog.deleteOne(
            {_id: fundLogId}
        )
            .then((result) => {
                res(result);
            })
            .catch((err) => {
                rej(err)
            })
    })
}

export default deleteFundLog;