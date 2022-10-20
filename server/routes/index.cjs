const express = require("express");
const dbo = require("../db/conn.cjs");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
// This will help us connect to the database
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/users").get(function (req, res) {
 let db_connect = dbo.getDb();

 db_connect
   .collection("users")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

recordRoutes.route("/activities").get(function (req, res) {
 let db_connect = dbo.getDb();

 db_connect
   .collection("activities")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you get a single record by id
recordRoutes.route("/user/:name").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { name: req.params.name };

  db_connect
    .collection("users")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
  
 // This section will help you create a new record.
 recordRoutes.route("/user/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
  };

  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });
  
 // This section will help you update a record by id.
 recordRoutes.route("/update/:name").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { name: req.params.name };
  let newvalues = {
    $set: {
      probable_activities: req.body.values,
    },
  };

  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
 });
  
 module.exports = recordRoutes;