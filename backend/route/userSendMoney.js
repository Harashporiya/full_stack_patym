const express = require("express");
const Transaction = require("../model/userSendMoney");

const router = express.Router();

router.post("/send", async(req,res)=>{
    const {loginUserId, sentUserId} = req.body;
    try {
        const existTranction = await Transaction.findOne({
            users:{$all:[loginUserId, sentUserId]}
        })
        if(existTranction){
            return res.status(200).json({message:"Already exist", existTranction})
        }
            const createTransaction=await Transaction.create({
               users: [loginUserId,
                sentUserId]
            })
         return res.status(200).send({message:"Transaction create id", createTransaction})
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})


module.exports = router;