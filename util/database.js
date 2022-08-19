const { MongoClient, ServerApiVersion } = require("mongodb");
const config = require("../config/dbConfig.json");

const client = new MongoClient(uri);

let _db;

const mongoConnect = (callback) => {
  client.connect((err) => {
    _db = client.db("store");
    callback();
  });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
