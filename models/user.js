const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDB();
    return db.collection("Users").insertOne(this);
  }

  static findByID(userID) {
    const db = getDB();
    return db
      .collection("Users")
      .findOne({ _id: mongodb.ObjectId(userID) })
      .then()
      .catch();
  }
}

module.exports = User;
