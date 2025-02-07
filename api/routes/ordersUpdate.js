const express = require('express')
const router = express.Router()
const { db } = require('../db.js')

router.put('/:id', async(req,res)=>{

    const { id } = req.params;
    const qSql = ('UPDATE orders SET `adresses` = ?, `cep` = ?, `city` = ?, `cityComplement` = ?, `country` = ?, `deliveryMethod` = ?,'
        +' `emailContact` = ?, `firstname` = ?, `lastname` = ?, `houseNumber` = ?, `cpf` = ?, `phone` = ?, `neighborhood` = ?, `paymentMethod` = ?,'
        +'`pixCopiaECola` = ?, `txid` = ?, `uf` = ?, `products` = ?, `status` = ?, `freteId` = ?, `freteStatus` = ? ')
    
    const values = [
        req.body.adresses,
        req.body.cep,
        req.body.city,
        req.body.cityComplement,
        req.body.country,
        req.body.deliveryMethod,
        req.body.emailContact,
        req.body.firstname,
        req.body.lastname,
        req.body.houseNumber,
        req.body.cpf,
        req.body.phone,
        req.body.neighborhood,
        req.body.paymentMethod,
        req.body.pixCopiaECola,
        req.body.txid,
        req.body.uf,
        req.body.products,
        req.body.status,
        req.body.freteId,
        req.body.freteStatus
    ]

    db.query(qSql,[...values,id], (err, data) => {
        if (err) return res.json("Error")
        return res.status(200).json(data)
    })

})

module.exports = router