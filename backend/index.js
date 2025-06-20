const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');
const { connectMongoDb } = require("./connect");
const userRoutes = require("./route/user");
const transactionRoutes = require("./route/transaction");
const jwt = require("jsonwebtoken");
const User = require("./model/user");
const secretKey = process.env.SECRET_KEY


const PORT = process.env.port | 5001;
const url = process.env.MONGODB_URL

const allowedOrigins = [process.env.FRONTEND_URL, process.env.FRONTEND_DEPLOY_URL];

connectMongoDb(url)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));


app.use(express.json());

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use("/user", userRoutes);
app.use("/transaction", transactionRoutes);


app.get("/user/data", async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.userId)
                              .select('-password');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));