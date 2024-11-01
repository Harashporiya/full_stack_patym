const mongoose = require("mongoose")
const TransactionSchema = new mongoose.Schema({
    users:[String]
},{timestamps:true})

const Transaction = mongoose.model("Transaction", TransactionSchema)
module.exports =Transaction;