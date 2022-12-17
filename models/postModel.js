const mongoose = require("mongoose");
const { stringify } = require("querystring");

let mySchema = mongoose.Schema;

//define schema
let myUserSchema = new mySchema({
  Title: { type: String },
  Description: { type: String },
  Author: { type: String },
  Datetime: { type: String}
});

const tableName = "posts";

let userData = mongoose.model(tableName, myUserSchema);

module.exports = userData;
