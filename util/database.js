const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://knull:asdf1234@cluster0.visqllj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let _db;

const mongoConnect = (callback) => {
  client.connect((err) => {
    // const collection = client.db("store").collection("devices");
    _db = client.db("store");
    callback();
    // perform actions on the collection object
    // callback(collection);
    // client.close();
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
