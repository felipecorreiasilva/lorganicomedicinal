const express = require('express')
const router = express.Router()
const { db } = require('../db.js')
const { getToken, getAllCob, getQrCodeByLocId, getLocById, getCobById } = require('../lib/pix.js')

router.get('/', async(req,res)=>{
    const qSql = 'SELECT * FROM orders'

    db.query(qSql, (err, data) => {
        if (err) return res.json("Error")
        return res.json(data)
    })

})

router.get('/v2/loc/:id/pixQrCode', async(req, res) => {

    const token = await getToken();
    const accessToken = token.access_token
    const locId = req.params.id
    const _getQrCodeByLocId = await getQrCodeByLocId(accessToken,locId)
    console.log('getQrCodeByLocId: ', _getQrCodeByLocId)
    return res.send(_getQrCodeByLocId)

})

router.get('/v2/loc/:id', async(req, res) => {

    const token = await getToken();
    const accessToken = token.access_token
    const locId = req.params.id
    const _getLocById = await getLocById(accessToken,locId)
    console.log('_getLocById: ', _getLocById)
    return res.send(_getLocById)

})

router.get('/v2/cob', async(req, res) => {

    const token = await getToken();
    const accessToken = token.access_token
    const _getAllCob = await getAllCob(accessToken)
    console.log('_getAllCob: ', _getAllCob)
    return res.send(_getAllCob)

})

router.get('/v2/cob/:id', async(req, res) => {

    const cobId = req.params.id
    console.log('cobId: ', cobId)
    const token = await getToken();
    const accessToken = token.access_token
    const _getCobById = await getCobById(accessToken,cobId)
    console.log('_getCobById: ', _getCobById)
    return res.send(_getCobById)

})

module.exports = router