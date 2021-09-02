const cookieParser = require("cookie-parser");
const express = require("express");
app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/new-ec-group-loppis-db",
{useNewUrlParser:true,useUnifiedTopology:true, autoIndex:true},
() =>{
    console.log("Mongodb is upp")
});

const userRouter = require("./routes/User");
app.use("/user",userRouter)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`)
})
