var mongoose = require('mongoose')
var Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new Schema({
    email:{type:String, match:/@/, required:true, unique:true},
    username:{type:String, required:true, trim:true},
    password:{type:String, min:8, max:15, required:true},
    bio:String,
    image:String,
    following:[{type:Schema.Types.ObjectId, ref:'User'}],
    follower:[{type:Schema.Types.ObjectId, ref:'User'}],
    favorites:[{type:Schema.Types.ObjectId, ref:'Article'}],
},{
    timestamps:true
})

userSchema.pre('save', async function(next){
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.verifyPassword = async function(password){
    try{
        const result = await bcrypt.compare(password, this.password)
        return result
    }catch(e){
        res.status(400).send(e)
    }
}

userSchema.methods.signToken = async function(){
    var payload = {userId: this._id, email:this.email}
    try{
        const token = await jwt.sign(payload, process.env.SECRET)
        return token
    }catch(e){
        return error
    }
}

userSchema.methods.userJson = function(token) {
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        token: token,
    }
}


module.exports = mongoose.model('User', userSchema)








