require('dotenv').config({ path: "./.env.homologacao" });
const multer = require('multer')
const { storage } = require('./multerConfig.js');
const express = require("express")
const cors = require("cors")

const app = express()

// routes
const products = require('./routes/products.js')
const frete = require('./routes/frete.js')
const newOrder = require('./routes/newOrder.js')
const createNewOrder = require('./routes/createNewOrder.js')
// const orders = require('./routes/orders.js')
const ordersManager = require('./routes/ordersManager.js')
const ordersUpdate = require('./routes/ordersUpdate.js')

// const account = require('./routes/account/account.js')
// const signup = require('./routes/account/signup.js')
// const login = require('./routes/account/login.js')
// const verifyOTP = require('./routes/account/verifyOTP.js')
// const resendOTPVerification = require('./routes/account/resendOTPVerification.js')

app.use(cors());
app.use(express.json())
app.use(express.static('public'))
// express use routes
app.use('/products',products)
app.use('/frete',frete)
app.use('/newOrder',newOrder)
app.use('/createNewOrder',createNewOrder)
app.use('/ordersManager',ordersManager)
app.use('/ordersUpdate',ordersUpdate)
// app.use('/account',account)
// app.use('/account/signup',signup)
// app.use('/account/login',login)
// app.use('/account/verifyOTP',verifyOTP)
// app.use('/account/resendOTPVerification',resendOTPVerification)

app.listen(3001, (err) => {
    
    if (err) {
        console.log('Servidor não iniciado.');
        console.log(err)
    } else {
        console.log('Servidor do coffee rodando na porta: 3001');
    }
    
})