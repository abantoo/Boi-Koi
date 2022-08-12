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
    const cartItemIndex = this.cart.items.findIndex((ci) => {
      return ci.bookID == book._id;
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartItemIndex >= 0) {
      newQuantity = this.cart.items[cartItemIndex].quantity + 1;
      updatedCartItems[cartItemIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push([
        { bookID: new mongodb.ObjectId(book._id), quantity: newQuantity },
      ]);
    }
    const updateCart = {
      items: updatedCartItems,
    };
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
