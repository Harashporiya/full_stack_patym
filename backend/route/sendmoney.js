const {Router} = require("express")
const router = Router();
const sendMoeny = require("../model/sendmoney");

router.post("/send", async(req,res)=>{
    const {cardNumber, amount}=req.body;

    try{
        const money = await sendMoeny.create({
            cardNumber,
            amount,
        })
       return res.status(200).json({money,message:"Amount successful"});
    }catch(error){
        
        return res.status(500).json({error:"Internal server error"})
    }
})

module.exports = router;