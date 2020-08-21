const express = require('express')
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')

const app= express()
const PORT = 3000
const {mongoUrl} = require('./keys')


require('./models/User');


//all routes goes below

const authRoutes = require('./routes/authRoutes')

const requireToken = require('./middleware/requireToken')

app.use(bodyParser.json())

app.use(authRoutes)




mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true

}
) 
//connecting to mongodb
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
    
})

mongoose.connection.on('error',()=>{
    console.log("cannot connect to mongo",err)
})



app.get('/',requireToken,(req,res)=>{
    res.send({email: req.user.email})
})

app.listen(PORT,()=>{
    console.log("server runing in " + PORT)
})