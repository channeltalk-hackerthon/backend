import User from '../../schema/user';

const createUser = (name: String, provider: String, snsId: String) => {
    const newuser = new User({
        name: name,
        provider: provider,
        snsId: snsId,
        wishlist: [],
    });

    return new Promise((res, rej) => {
        newuser
            .save()
            .then((doc) => {
                res(doc);
            })
            .catch((err) => {
                rej(err);
            })
    })
}

export default createUser;