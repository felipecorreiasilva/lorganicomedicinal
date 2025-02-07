const express = require('express')
const router = express.Router()
const { db } = require('../db');

router.post('/', async(req,res)=>{

    const q = "INSERT INTO `orders` (`id` ,`adresses`, `cep`,  `city`, `cityComplement`, `country`, `deliveryMethod`, `emailContact`, `firstname`, `lastname`,  `houseNumber`, `cpf`, `phone`, `neighborhood`, `paymentMethod`, `pixCopiaECola`, `txid`, `uf`, `products`, `status`, `totalPrice`, `freteId`, `freteStatus` ) VALUES (?)"
    
    console.log('req.body: ', req.body)

    const values = [
        
        req.body.id,
        req.body.adresses,
        req.body.cep,
        req.body.city,
        req.body.cityComplement,
        req.body.country,
        req.body.deliveryMethod,
        req.body.emailContact,
        req.body.firstname,
        req.body.lastname,
        parseInt(req.body.houseNumber),
        req.body.cpf,
        req.body.phone,
        req.body.neighborhood,
        req.body.paymentMethod,
        req.body.pixCopiaECola,
        req.body.txid,
        req.body.uf,
        JSON.stringify(req.body.products),
        req.body.status,
        req.body.totalPrice,
        req.body.freteId,
        req.body.freteStatus

    ]

    console.log('values: ',values)
    
    db.query(q, [values], (err, data) => {
        
        if (err) return res.json("Error");
        return res.json(data)

    })

})

module.exports = router