const express = require("express")
const app = express();
const PORT = 4444;
const cors = require('cors');
const { connectMongoDb } = require("./connect.js")
const User = require("./route/user");
const userData = require("./model/user");
const jwt = require("jsonwebtoken");

const secretKey = "wertyuiolkjhgfdszxcvbnm";


connectMongoDb('mongodb://127.0.0.1:27017/paytem')
    .then(() => console.log("Mongodb Connected"))

// app.get("/user", (req,res)=>{
//     return res.send("Harash");
// })
app.use(cors());
app.use(express.json())
app.use("/user", User);
    


app.get("/user/data", async (req, res) => {
    const token = req.headers.authorization;
    // console.log(token)
    if (!token) {
        return res.status(401).json({ error: "Unautorized" });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        const { email, firstname, lastname } = await userData.findOne({ _id: decoded.userId });
        // console.log(decoded)
        res.json({ email: email, firstname: firstname, lastname:lastname })
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
})


app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`))