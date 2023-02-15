import User from '../../schema/user';

const userExists = (provider: String, snsId: String) => {
    return new Promise((res, rej) => {
        User
            .exists({provier: provider, snsId: snsId})
            .then((user) => {
                if (user == null) {res(false)}
                else {res(true)}
            })
            .catch((err) => rej(err))
    })
}

export default userExists;