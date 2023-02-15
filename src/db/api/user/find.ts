import User from '../../schema/user';

const findUser = (provider: String, snsId: String) => {
    return new Promise((res, rej) => {
        User
            .findOne({provider: provider, snsId: snsId})
            .then((user) => res(user))
            .catch((err) => rej(err))
    })
}