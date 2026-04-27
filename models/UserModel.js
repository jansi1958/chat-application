const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        min: 5,
    },
    email: {
        type: String,
        required:true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        min:5,
        max:10,
    },
    isDisplayPicture: {
        type: Boolean, 
        default: false,
    },
    displayPicture: {
        type: String,
        default:"",
    },
})


module.exports = mongoose.model("Users", UserSchema);