const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller')
const userMiddleware = require('../middlewares/user.middleware')
const jwt = require('jsonwebtoken')


/* /users/register  [get] */
router.get('/register', userController.registerViewController)

/* /users/register [post] */
router.post('/register', userController.registerUserController)

router.get('/login', userController.loginViewController)

router.post('/login', userController.loginUserController)

/* /users/feed [get] {protected} */
router.get('/feed', userMiddleware.authUser, userController.feedViewController)

/* /users/profile [get] */
router.get('/profile', (req, res, next) => {
    
    try{

        const token = req.cookies.token;
    
        jwt.verify(token, "node-project-secret" )
    
       
        next()

    } catch (err) {
        console.log(err)
        res.send('Unauthorized')
    }
   

}, userController.profileViewController)


module.exports = router;