import rateLimit from 'express-rate-limit'

const requestLimit = async (t) => {

        return (req, res, next) => {

        try {

           const lim =  rateLimit({
                windowMs: t * 60 * 1000, // 1 hour
                max: 10, // Limit each IP to 5 create account requests per `window` (here, per hour)
                message:
                    'Too many OTPs sent from this account. Try again after an hour',
                standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
                legacyHeaders: false, // Disable the `X-RateLimit-*` headers
            })
            console.log("limmmmmmmmmmmm", lim)
        } catch (e) {
            console.error("Otp error rate limiting", e)


            res.status(401).send({
                "message":'Too many OTPS sent from this account. Try again after an hour',
                "error":e.message
            })
        }
    }
}

export {requestLimit}