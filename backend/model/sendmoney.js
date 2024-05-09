const {Schema, model} = require("mongoose")

const sendmoneySchema = new Schema({
    cardNumber:{
        type:String,
        required:true,
        unique:true,
    },
    amount:{
        type:String,
        required:true,
    }

},{timestamps:true});

const send = model("send", sendmoneySchema);

module.exports = send;