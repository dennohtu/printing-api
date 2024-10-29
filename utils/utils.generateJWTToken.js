import {secrets} from "../config/config.config.js";
import jwt from 'jsonwebtoken'


export const generateToken = (id) => {
    try{


    return jwt.sign({ id }, secrets.JWT_SECRET, {
        expiresIn: '10d',
    })

    }catch (e) {
        throw Error(`Something went wrong while trying to generate token. ${e.message}`)

    }
}

