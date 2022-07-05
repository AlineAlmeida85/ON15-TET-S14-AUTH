const mongoose = require("mongoose")

const lanchesSchema = new mongoose.Schema({ 
    id: mongoose.Schema.Types.ObjectId, 
    title: {
        type: String,
        required: true
    }, 
    price:{
        type: Number,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Lanches", lanchesSchema) 