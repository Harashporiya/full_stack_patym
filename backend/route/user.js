const Router = require("express")
const router = Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const secretKey = "wertyuiolkjhgfdszxcvbnm";
router.post("/signup", async(req,res)=>{
    const {firstname, lastname,email,password} = req.body;

  try{
    const user = await User.create({
        firstname, lastname,email,password
    })
    const token = jwt.sign({user:user._id}, secretKey,{expiresIn:"5d"})
    return res.status(200).json({token,user, message:"Signup successfull"})
  }catch(error){
    return res.json({message:`Error while creating account ${error}` })
    
  }

})

router.post("/login", async(req,res)=>{
 const {email} = req.body;
 try{
  const loginUser = await User.findOne({
     email
  })
  const token = jwt.sign({userId:loginUser._id},secretKey,{expiresIn:"5d"})
  return res.status(200).json({token,loginUser, message:"Login successfull"})

 }catch(error){
  return res.json({message:`Error while Login ${error}`})
 }
})

router.get("/send/user/", async(req,res)=>{
  try {
    const send = await User.find();
    return res.status(200).json(send);
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
}
})


module.exports = router;