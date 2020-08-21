const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique:true,
        required:true

    },
    password:{
        type: String,
        required:true
    }
})
//password hashing mongodb documentation 

userSchema.pre('save',function(next){
    const user = this
    if(!user.isModified('password')){
        return next();
    }
    //using salt for salting password
    bcrypt.genSalt(10,(err,salt)=>
    {
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password,salt,(err,hash)=>
        {
            if(err){
                return next(err);
            }
            user.password = hash; //updating password to generated hashs
            next()
        })
    })


})

userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}

mongoose.model('User',userSchema);