const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport")
const jwt = require("jsonwebtoken");
const User = require("../models/User")

//Function to create our json webtoken
const signToken = (userId) =>{
return jwt.sign(
    {
        iss:"Deeddde",
        sub: userId
    },
    "dedde",
    {
        expiresIn:60*60*24,
    }
)
}


//Save new user to db
userRouter.post("/register", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err) {
        res
          .status(500)
          .json({ message: { msgBody: "An error occured", msgError: true } });
      }
      if (user) {
        res.status(400).json({
          message: { msgBody: "Username allready taken", msgError: true },
        });
      } else {
        const newUser = new User({ username, password });
        newUser.save((err) => {
          if (err) {
            res
              .status(500)
              .json({ message: { msgBody: "An error occured", msgError: true } });
          } else {
            res.status(200).json({
              message: {
                msgBody: "Account successfully created",
                msgError: false,
              },
            });
          }
        });
      }
    });
  });

userRouter.post("/login", passport.authenticate("local", {session:false}), (req,res) => {
    if(req.isAuthenticated()){
        const {_id, username} = req.user;
        const token = signToken(_id)
        res.cookie("acces-token", token, {httpOnly:true, sameSite:true});
        res.status(200).json({
            isAuthenticated:true,
            user:{_id, username},
            message:{msgBody:"Successfully logged in",megError:false}
        })
    }
})
userRouter.get("/authenticated",passport.authenticate("jwt",{session:false}), (req,res) =>{
    const {_id, username} = req.user;
    res.status(200).json({
        isAuthenticated:true,
        user:{_id, username}
    })
})

userRouter.get("/logout", passport.authenticate("jwt",{session:false}), (req,res) =>{
    res.clearCookie("acess-token");
    res.status(200).json({message:{msgBody:"User has been logged out"}, success:true})
})

module.exports = userRouter;


