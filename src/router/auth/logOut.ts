import express, {Express, NextFunction, Request, Response} from "express";

const logOut = (req: Request) => {
    return new Promise((resolve, reject) => {
        req.logout((err) => {
            if(err) {reject(err)}
            else {resolve(void 0)}
        })
    })
}

const destroySession = (req: Request) => {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if(err) {reject(err)}
            else {resolve(void 0)}
        })
    })
}

export {logOut, destroySession};