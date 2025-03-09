const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const userMiddleware = require('../middlewares/user.middleware')


/* /post/create [get] {protected} */
router.get('/create',userMiddleware.authUser, postController.createPostView)


/* /post/create [post] {protected}*/
router.post('/create',userMiddleware.authUser, postController.createPost)

module.exports = router;