var express = require('express');
var router = express.Router();
var pool= require('./pool');
var upload = require('./multer');

router.post('/company_data',upload.single("logo"), function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
  pool.query("insert into company (companyname, ownername, emailaddress, mobilenumber, address, state, city, logo, password, status, createat, updateat, createdby) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyname, req.body.ownername, req.body.emailaddress, req.body.mobilenumber, req.body.address, req.body.state, req.body.city, req.file.originalname, req.body.password, req.body.status, req.body.createat, req.body.updateat, req.body.createdby], function(error, result){
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

router.get('/display',upload.single("logo"), function(req, res, next) {
    // console.log(req.body)
    // console.log(req.file)
  pool.query("select C.*, (select S.statename from state S where S.stateid=C.state) as statename, (select CC.cityname from cities CC where CC.cityid=C.city) as cityname from company C", function(error, result){
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