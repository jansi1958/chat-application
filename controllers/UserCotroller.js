const bcrypt = require("bcrypt")
const User = require("..models/UserModel.js");

module.exports.login = async (req, res, next)=>{
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if (!user)
            return res.json({msg : "Incorrect username or password, try again", status: false});
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword )
            return res.status(404).json({msg : "Incorrect username or password, try again", status: false});
        return res.json({msg: "login successful", status:true, user});
    } catch(err){
        console.log(err);
        next(err);
    }
};

module.exports.register = async (req, res, next)=>{
    try{
        const {username, email, password} = req.body;
        const checkUsername = await User.findOne({username});
        if(checkUsername)
            return res.json({msg:"Username already exists, try something else", status:false})
        const checkEmail = await User.findOne({email});
        if(checkEmail)
            return res.json({msg:"Email already exists, try logging in", status:false})
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user});

    } catch (err){
        cosmole.log(err);
        next(err);
    }
}

module.exports.getAllUsers = async (req,res,next)=>{
    try{
        const user = await User.find({_id: {$ne: req.params.id}}).select([
            "email",
            "username",
            "displayPicture",
            "_id",
        ]);
        return res.json(user)
    } catch(err){
        console.log(err);
        next(err);
    }
}

module.exports.logOut = async (req,res,next)=>{
    try{
        if(!req.params.id) return res.json({msg:"User ID is required to logout"});
        onlineUsers.delete(req.params.id);
        return res.status(200).send();

    } catch(err){
        console.log(err);
        next(err);
    }
}