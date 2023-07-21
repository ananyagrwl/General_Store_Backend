var express = require('express');
var router = express.Router();
var pool= require('./pool');
var upload = require('./multer');

router.post('/category_data',upload.single("icon"), function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
  pool.query("insert into category (companyid, categoryname, description, icon, createat, updateat, createdby) values (?,?,?,?,?,?,?)",[req.body.companyid, req.body.categoryname, req.body.description, req.file.originalname, req.body.createat, req.body.updateat, req.body.createdby], function(error, result){
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

router.get('/display',upload.single("icon"), function(req, res, next) {
    // console.log(req.body)
    // console.log(req.file)
  pool.query("select * from category", function(error, result){
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

module.exports = router;