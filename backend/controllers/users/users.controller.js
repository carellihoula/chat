const User = require('../../models/UserModel')
const ms = require('ms')
///////////////////////////////////////////////////SEND TOKEN RESPONSE //////////////////////////////////////////////////

const sendTokenResponse = (user, statusCode, res) => {
    const mes = "User created successfully"
    const token = user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now() + ms(process.env.JWT_COOKIE_EXPIRE)),
        httpOnly:true
    }

    if(process.env.NODE_ENV === 'production'){
        options.secure = true
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
        succes:true,
        mes,
        token 
    })
}
///////////////////////////////////////////////////SEND TOKEN RESPONSE //////////////////////////////////////////////////

module.exports.createUser = async (req, res) => {
    const {email} = req.body
    const {username} = req.body
    const existingEmailUser = await User.findOne({email}) 
    const existingUsernameUser = await User.findOne({username})
    if (existingEmailUser || existingUsernameUser) {
        return res.status(400).json({mes:"User already exists"})
    }
    const newUser = new User(req.body)
    newUser.save()
    .then((user)=>{
        if(!user){
            const mes = "invalid content"
            return res.status(400).json({mes})
        }
        //const mes = "User created successfully"
        //res.status(200).json({mes,data: user})
        sendTokenResponse(user, 200, res)
    })
    .catch((error)=>{
        const mes = "User not created"
        res.status(500).json({mes,data: error})
    })
}

module.exports.getAllUsers = async(req, res) => {
    await User.find({})
    .then((users)=>{
        res.status(200).json({success:true,data: users, mes:"users list retrieved successfully"})
    })
    .catch((error)=>{
        res.status(500).json({mes:"error from server",data: error})
    })
}

module.exports.getUserById = async(req, res) => {
    const id = req.params.id
    await User.findById(id)
    .then((user)=> {
        if(!user){
            const mes = "User not found"
            return res.status(404).json({mes})
        }
        res.status(200).json({success:true, data:user, mes:"user retrieve successfully"})
    })
    .catch((error)=>{
        res.status(500).json({success:false, data:error, mes:"Error from server"})
    })
}

module.exports.updateUser = async(req,res) => {
    const id = req.params.id
    await User.findByIdAndUpdate(id,req.body,{
        new:true
    })
    .then((user)=>{
        if(!user){
            const mes = "User not found"
            return res.status(404).json({mes})
        }
        res.status(200).json({success:true, data:user, mes:"user updated successfully"})
    })
    .catch((error)=>{
        res.status(500).json({success:false, data:error, mes:"Error from server"})
    })
}

module.exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ mes: "User not found" });
        }

        return res.status(200).json({ success: true, mes: "User deleted successfully", data:user });
    } catch (error) {
        console.error("Error in deleting user:", error);
        return res.status(500).json({ success: false, data: error, mes: "Error from server" });
    }
};

module.exports.deleteManyUsers = async(req, res) => {
    const {ids} = req.body;
    await User.deleteMany({_id:{$in:ids}})
    .then((user) =>{
        if(user.deletedCount===0) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }
        res.status(200).json({ success: true, message: 'Users deleted successfully' });
    })
    .catch((error) =>{
        console.error('Error deleting users:', error);
        return res.status(500).json({ success: false, error: error.message });
    })
}






