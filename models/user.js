const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    income: {
        type: Number,
        default: 0,
    },
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const hash = await bcrypt.hash(user.password, 8);
        user.password = hash;
        next();
    } catch(err) {
        next(err);
    };
});

userSchema.methods.checkPassword = async function (passwordAttempt) {
    try {
        const isMatch = await bcrypt.compare(passwordAttempt, this.password);
        return isMatch;
    } catch(err){
        throw err;
    };
};

userSchema.methods.withoutPassword = function() {
    const user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model("Users", userSchema);