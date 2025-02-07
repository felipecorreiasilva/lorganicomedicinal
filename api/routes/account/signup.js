const express = require('express')
const router = express.Router()
const { db } = require('../../db');
const { sendOTPVerificationEmail } = require('../../lib/twofa.js');
const {hash} = require('bcrypt');

router.post('/', async(req, res) => {

    const q = "SELECT * FROM users WHERE email = ?"
    const qSql = "INSERT INTO `users` (`username` , `password`,  `email`, `phone`, `birth`, `verified`, `isAdmin`) VALUES (?)"

    const {username,password,email,phone,birth} = req.body
    const verified = false
    const isAdmin = false
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds)

    const values = [
        username,
        hashedPassword,
        email,
        phone,
        birth,
        verified,
        isAdmin
    ]

    db.query(q, [email], (err, dataSelect) => {
        
        if (err) return res.json("ErrorSelect");
        
        if (dataSelect.length == 0){

            db.query(qSql,[values], async(errInsert, userData) => {

                if (errInsert) return res.json("ErrorInsert")

                    const objOtpVerification = {
                        userId: userData.insertId,
                        firstname,
                        lastname,
                        email,

                    }

                    const otpData = await sendOTPVerificationEmail(objOtpVerification)
                     
                    return res.json({msgRegistered: 'Cadastrado com sucesso ', userData, registered: true, msgOtp: 'Código de verificação enviado ', otpData})
                    
            })

        }else{
                return res.json({msgRegistered: 'Usuário já cadastrado', registered: false})
            }

    })
    
})

module.exports = router
