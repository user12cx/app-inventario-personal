const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateAccesToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRECT_TOKEN, {
            expiresIn: "1d"
        }, (err, token) => {
            if (err) {
                return reject(resolve)
            } else {
                return resolve(token)
            }
        })
    }) 
}


module.exports = {
    generateAccesToken
}
