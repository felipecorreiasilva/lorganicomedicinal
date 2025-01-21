const express = require('express')
const router = express.Router()
const { createPixCharge } = require('../lib/pix.js')

router.post('/pix', async(req, res) => {
    
    const pixCharge = await createPixCharge(req.body)
    const {qrcode, cobranca} = pixCharge;
    return res.send({ ok: 1, qrcode, cobranca })
    
})



module.exports = router
