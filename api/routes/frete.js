const express = require('express')
const router = express.Router()
const { calcFrete, addFreteCart, allItemsCart, getFreteCartById, getLabelById } = require('../lib/frete.js')

router.post('/calcFrete', async(req,res)=>{

    const _calcFrete = await calcFrete(req.body)
    return res.json(_calcFrete.data)

})

router.get('/allItemsCart', async(req,res)=>{

    const _allItemsCart = await allItemsCart()
    return res.json(_allItemsCart.data)

})

router.get('/getFreteCartById/:id', async(req,res)=>{

    const {id} = req.params
    console.log('freteId: ', id)
    const _getFreteById = await getFreteCartById(id)
    return res.json(_getFreteById)

})

router.get('/getLabelById/:id', async(req,res)=>{

    const {id} = req.params
    
    const _getLabelById = await getLabelById(id)
    console.log('_getLabelById: ',  _getLabelById)
    return res.json(_getLabelById)

})

router.post('/addFreteCart', async(req,res)=>{

    console.log('req.body: ',req.body)
    const _addFreteCart = await addFreteCart(req.body)
    return res.json(_addFreteCart.data)

})

module.exports = router
