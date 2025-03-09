const userModel = require('../models/user.model')
const postModel = require('../models/post.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




module.exports.registerViewController = (req, res) => {
    res.render('register')
}

module.exports.registerUserController =async (req, res) => {
   
    const { username, email, profileImage, password } = req.body;

    const hashPassword =await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        profileImage,
        password: hashPassword
    })

    
    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, "node-project-secret")

    res.cookie('token', token)
    
    res.send({
        user, token
    })
}


module.exports.profileViewController = (req, res) => {
    res.render('profile')
}

module.exports.loginViewController = (req, res) => {
    res.render('login')
}

module.exports.loginUserController = async (req, res) =>{

    const { email, password } = req.body

    console.log("Login attempt with email:", email)

    const user = await userModel.findOne({
        email
    })

    if(!user) {
        return res.status(400).json({
            message: "user not found"
        })
    
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(400).json({
            message: "invalid password"
        })
    }
    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, "node-project-secret")

    res.cookie("token", token)

    res.send({
        user,
        token
    })
 }

   // if user is login successfully open the feed page
  // res.redirect('feed')

   module.exports.feedViewController = async(req, res) => {

    const posts = await postModel.find().populate('author');
    console.log(posts);
    res.render("feed", {posts})
   }
