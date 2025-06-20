const Router = require("express");
const router = Router();
const Transaction = require("../model/transaction");
const User = require("../model/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    const token = authHeader.split(" ")[1]; 
  
    try {
      const decoded = jwt.verify(token, secretKey);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
};
  
router.post("/send/:receiverId", authenticate, async (req, res) => {
    const { receiverId } = req.params;  
    const { amount } = req.body;

    try {
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const sender = await User.findById(req.userId);
        const receiver = await User.findById(receiverId);

        if (!receiver) {
            return res.status(404).json({ 
                error: "Receiver not found",
                suggestion: "Check the receiver ID",
                availableUsers: await User.find({}, '_id email firstname')  
            });
        }

        if (sender.balance < amount) {
            return res.status(400).json({ 
                error: "Insufficient balance",
                currentBalance: sender.balance
            });
        }

        const transaction = await Transaction.create({
            sender: sender._id,
            receiver: receiver._id,
            amount: amount,
            status: 'pending'
        });

       
        sender.balance -= amount;
        receiver.balance = Number(receiver.balance) + Number(amount);

        await sender.save();
        await receiver.save();

       
        transaction.status = 'completed';
        await transaction.save();

        return res.status(200).json({
            message: "Transaction successful",
            transaction,
            senderNewBalance: sender.balance,
            receiverNewBalance: receiver.balance
        });

    } catch (error) {
        console.error("Transaction error:", error);
        return res.status(500).json({ 
            error: "Internal server error",
            details: error.message 
        });
    }
});

router.get("/history", authenticate, async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $or: [
                { sender: req.userId },
                { receiver: req.userId }
            ]
        }).populate('sender receiver', 'firstname lastname email');

        return res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/test-users", async (req, res) => {
    try {
        const users = await User.find({}, 'email _id balance');
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;