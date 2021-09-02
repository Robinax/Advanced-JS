const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
});

//Run this function before every save
UserSchema.pre("save", function(next){
bcrypt.hash(this.password, 10, (err, passwordHashed) => {
    if(err){
        return next(err)
    }else{this.password = passwordHashed;
        next();

    }
})
})
//gets called from passport local strategy in passport.js to compare password sen from client
UserSchema.methods.comparePassword = function (password, callback){
bcrypt.compare(password, this.password, (err, isMatch) =>{
    if(err){
    return callback(err)
    }
    if(!isMatch){
    return callback(null, isMatch)
    }
    return callback(null, this);
})
}

module.exports = mongoose.model("User", UserSchema)