const Router = require("express");
const router = Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY


router.post("/signup", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const user = await User.create({
            firstname,
            lastname,
            email,
            password, 
            balance: 1000 
        });

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "5d" });
        return res.status(201).json({
            token,
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                balance: user.balance
            },
            message: "Signup successful"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while creating account" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "5d" });
        return res.status(200).json({
            token,
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                balance: user.balance
            },
            message: "Login successful"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while logging in" });
    }
});

router.get("/:id", async (req,res)=>{
  const {id} = req.params
  try {
    const userFind = await User.findById(id)
    if(!userFind){
      return res.status(404).json({message:"user Not found"});
    }
    return res.status(200).json(userFind);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
})

router.get("/", async (req, res) => {
    try {
        const users = await User.find().select('-password');
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;