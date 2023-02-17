// import express, {Router, Request, Response, NextFunction} from 'express';
// import mongoose from 'mongoose';
// import findUser from '../../db/api/user/find';

// import Wish from '../../db/schema/wish';
// import User from '../../db/schema/user';

// /*
// feed 생성
// - 친구들의 wish
// - 추천 알고리즘에 의한 wish
//   (상품 기반) -> 유저가 고른 wish 벡터 기반 (wishList.length > 0)
//   (유저 기반) -> 유저 특성을 기반으로 하여 유사한 타 유저들의 wish
//                 -> collaborative filtering (making automatic predictions)

// 1. 친구들의 wish List를 넣음
// 2. 추천 알고리즘에 의한 wish를 넣음

// 추천 알고리즘 데이터

// - age
// - gender
// - wishlist (product 특성)
//     - price
//     - product_description
//         - 상품 별점
//         - 카테고리
// - fundList(?) (x)

// 처음에는 추천 X (임의 추천)
// 불호 데이터 쌓이면 이 데이터 기반 추천!

// 불호 데이터
// (price, category, brand) cosin 유사도 & 별점 적용
// one-hot vector화 시켜서 cosin 유사도

// */
// const createFeed = (self: mongoose.Types.ObjectId) => {
//     return new Promise((res,rej) => {
//         findUser(self)
//             .then((user: any) => {
//                 const feed = user.friendList; // 1
//                 const wishes = Wish.find(); // all wishes to be

//                 const

//             })
//             .catch((err) => {
//                 rej(err);
//             })

//     })
// }

// export default createFeed
