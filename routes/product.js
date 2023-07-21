var express = require('express');
var router = express.Router();
var pool= require('./pool');
var upload = require('./multer');

router.get('/fetch_category', function(req, res, next) {
    console.log(req.body)
  pool.query("select categoryid, categoryname from category", function(error, result){
    if(error){
        console.log(error)
        res.status(500).json({status:false, message:"Server Error"})
    }
    else {
        console.log(result)
        res.status(200).json({status:true, data:result})
    }
  })
});

router.post('/product_data',upload.single("image"), function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
  pool.query("insert into products (companyid, categoryid, productname, description, status, trending, deals, pricetype, image, createat, updateat, createdby) values (?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyid, req.body.categoryid, req.body.productname, req.body.description, req.body.status, req.body.trending, req.body.deals, req.body.pricetype, req.file.originalname, req.body.createat, req.body.updateat, req.body.createdby], function(error, result){
    if(error){
        console.log(error)
        res.status(500).json({status:false, message:"Server Error"})
    }
    else {
        console.log(result)
        res.status(200).json({status:true, message:"Record Submitted Successfully"})
    }
  })
});

module.exports = router;