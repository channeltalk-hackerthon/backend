import User from '../../schema/user';

const findUserBySns = (provider: String, snsId: String) => {
    return new Promise((res, rej) => {
        User
            .findOne({provider: provider, snsId: snsId})
            .then((user) => {
                if (user == null) {rej("User not found. FindUser By Sns")}
                res(user)
            })
            .catch((err) => rej(err))
    })
}

export default findUserBySns;