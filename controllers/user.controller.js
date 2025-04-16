const { User } = require("../models/user.model")




const userProfileGetController = (req, res) => {

}

const userRegisterPostController = async (req, res) => {
    //checks if user exits
    //save user in database

    try {
        const { userName, email, password } = req.body;
        const user = await User.create({
            userName, email, password
        })
        res.status(201).json({
            status: 'Success',
            data: user
        })

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
        console.log(error)
    }

}


const userLoginPostController = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.matchPassword(email, password)

    if (user) {
        return res.status(200).json({
            status: 'success',
        })
    }

    res.status(401).json({
        status: "failed",
        message: 'invalid credentials'
    })
}


module.exports = {
    userProfileGetController,
    userRegisterPostController,
    userLoginPostController
}
