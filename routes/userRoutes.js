const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
var jwt = require('jsonwebtoken');


let router = express.Router();


router.post("/signup", async(req, res) => {
  
  const user = req.body;

  // check if email and phone already exists
  const EmailAlreadyExists = await userModel.findOne({email:user.email})
  const PhoneAlreadyExists = await userModel.findOne({number:user.number})

  if( EmailAlreadyExists || PhoneAlreadyExists){
    return res.status(201).json({data:"Data already exists."})
  }

  bcrypt.hash(user.password, 10, function(err, hash){
    // store hash in your password
    const newUser = new userModel({
      name:user.name,
      email:user.email,
      password:hash,
      number:user.number,
      age:user.age,
      gender:user.gender,
      address:user.address
    });

    newUser
    .save()
    .then((data) => {
      return res.status(200).json({data : "DATA STORED "});
    })
    .catch((e) => {
      return res.status(201).json({data : "Error While Storing. ",e});
    })
  })
});


module.exports = router;
