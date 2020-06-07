const mongoose = require('mongoose')

const medsSchema = new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        required:true

    },
    stock:{
        type: String,
        required: true
        
    }
})

mongoose.model('Meds',medsSchema);