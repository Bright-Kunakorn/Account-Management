const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://NARIT:cNarit73@cluster0.p42in.mongodb.net/star";
const app = express();

app.set('view engine')
app.use(express.static("public"));
const script = express();
mongoose.connect(url);

app.listen(4000, function () {
  console.log('server is runing on port');
});