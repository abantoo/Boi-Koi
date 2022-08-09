const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDB();
    return db.collection("Users").insertOne(this);
  }

  addToCart(book) {
    const updateCart = { items: [{ ...book, quantity: 1 }] };
    const db = getDB();
    return db
      .collection("Users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updateCart } }
      )
      .then()
      .catch();
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
