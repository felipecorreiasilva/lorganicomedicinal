const express = require('express')
const multer = require('multer')
const { storage } = require('../multerConfig.js');
const router = express.Router()
const { db } = require('../db');

const upload = multer({ storage: storage })

router.get("/", (req, res) => {

    const sql = 'SELECT * FROM products'

    db.query(sql, (err, data) => {
        if (err) return res.json("Error")
        return res.json(data)
    })
    
})

router.post("/addProduct", upload.single("file"), (req, res)=> {
    return res.json(req.file.filename);
});

router.put("/editProduct/:id", upload.single("file"), (req, res)=> {
    const { id } = req.params;
    const sql = 'UPDATE products SET `name` = ?, `desc` = ?, `country` = ?, `image` = ?, imageList = ?, `price` = ?, `height` = ?, `width` = ?, `_length` = ?, `weight` = ?, `discount` = ?, `discountDesc` = ?, `oldPrice` = ?, `amountProduct` = ? WHERE `id` = ?'
    console.log('id: ', req.body)
    const values = [
        req.body.name,
        req.body.desc,
        req.body.country,
        req.body.image,
        req.body.imageList,
        req.body.price,
        req.body.height,
        req.body.width,
        req.body._length,
        req.body.weight,
        req.body.discount,
        req.body.discountDesc,
        req.body.oldPrice,
        req.body.amountProduct,
    ]

    db.query(sql,[...values,id], (err)=> {
        if (err) return res.json({msg:'Produto não encontrado',err});
        return res.status(200).json({msg:`${req.body.name} foi atualizado com sucesso`});
    });
});

router.delete("/deleteProduct/:id", (req,res)=> {
    
    const qSql = 'DELETE FROM products WHERE `id` = ?';

    db.query(qSql,[req.params.id], (err)=> {
        if (err) return res.json({msg:'Produto não encontrado',err});
        return res.status(200).json({msg:"Produto deletado com sucesso."});
    });

})

module.exports = router
