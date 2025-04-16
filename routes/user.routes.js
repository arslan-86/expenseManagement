const router = require('express').Router();
const { userLoginPostController,
    userRegisterPostController,
    userProfileGetController } = require('../controllers/user.controller.js')


router.post('/login', userLoginPostController)

router.post('/register', userRegisterPostController)


module.exports = {
    router
}