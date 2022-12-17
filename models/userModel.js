const mongoose = require("mongoose");
const { stringify } = require("querystring");

let mySchema = mongoose.Schema;

//define schema
let myUserSchema = new mySchema({
  name: { type: String, required: [true, "first name is required.."] },
  email: { type: String, required: [true, "email is required.."] },
  password: { type: String, required: [true, "password is required.."] },
  number: { type: String,max: 10, required: [true, "number is required.."] },
  age: { type: String, required: [true, "age is required.."] },
  gender: { type: String, required: [true, "gender is required.."] },
  address: { type: String, required: [true, "address is required.."] },
});

const tableName = "users";

let userData = mongoose.model(tableName, myUserSchema);

module.exports = userData;
