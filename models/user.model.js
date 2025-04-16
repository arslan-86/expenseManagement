const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

userSchema.static('matchPassword', async function (email, plainPassword) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User does not exist');


    return await bcrypt.compare(plainPassword, user.password)
    
})
const User = mongoose.model('User', userSchema);


module.exports = {
    User
}