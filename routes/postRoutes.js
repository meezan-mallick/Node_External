const express = require("express");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

const postModel = require("../models/postModel");
let router = express.Router();

router.post("/create", async (req, res) => {
 console.log("create is working")
  const postData = req.body;
  const posts = new postModel({
    Title: postData.title,
    Description: postData.description,
    Author: postData.author,
    Datetime: postData.datetime
  });
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(409).json({ data: "Token not exist" });
  }
  const token = auth.replace("Bearer ", "");
  jwt.verify(token, "login-token", async function (err, decoded) {
    // err
    console.log("err", err);
    // decoded undefined
    console.log("decoded", decoded);
    if (err) {
      return res.status(409).json({ data: err });
    } else {
      posts
        .save()
        .then((data) => {
          return res.status(200).send({ message: "Post Saved.." });
        })
        .catch((e) => {
          return res.status(201).send({ message: "Error : ", e });
        });
    }
  });
});


// view all post
router.get("/view", (req, res) => {
  postModel
    .find()
    .then((data) => {
      if (data.length > 0) return res.send(data);
      else return res.send({ message: "No Data Found" });
    })
    .catch((e) => {
      return res.send({ message: e });
    });
});


//Delete post  by Id
router.get("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const post = await postModel.findById(id);
    console.log(post);
    if (post) {
      postModel.deleteOne(student).then(() => {
        return res.send({ message: "Post Deleted" });
      });
    } else {
      return res.send({ message: `Data Not Found For ID: ${id}` });
    }
  });

module.exports = router;