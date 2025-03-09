// const jwt = require('jsonwebtoken');

// module.exports.authUser = (req, res, next) => {

//     try{
//     const token = req.cookies.token;
    
//     if(!token){
//         return res.send('You are not logged in')
//     }


//     const decoded = jwt.verify(token, "node-project-secret");

//     req.user = decoded;

//     next();

// } catch(error) {
//     return res.send("You are not logged in")
// }
// }

const jwt = require('jsonwebtoken')

module.exports.authUser = async (req, res, next) => {

    try{
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
        if (!token) {
            res.status(401).json({
                message: "unauthorized"
            })
        }
        const decoded = jwt.verify(token, "node-project-secret")
        req.user = decoded
        next()

    } catch(err){
        res.status(401).json({
            message: "unauthorized"
        })
    }
}