const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

const ObjectId = mongodb.ObjectId;

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
    // const cartItemsProductIds = this.cart.items[1].productId;
    // const cartItemIndex = this.cart.items.find((ci) => {
    //   return ci.productId.toString() === book._id.toString();
    // });

    // console.log(cartItemIndex);
    // let newQuantity = 1;
    // const updatedCartItems = [...this.cart.items];

    console.log(book);

    // if (cartItemIndex >= 0) {
    //   newQuantity = this.cart.items[cartItemIndex].quantity + 1;
    //   updatedCartItems[cartItemIndex].quantity = newQuantity;
    // } else {
    //   updatedCartItems.push([
    //     {
    //       productId: new mongodb.ObjectId(book._id),
    //       quantity: newQuantity,
    //     },
    //   ]);
    // }
    // const updateCart = {
    //   items: updatedCartItems,
    // };
    // const db = getDB();
    // return db
    //   .collection("Users")
    //   .updateOne(
    //     { _id: new mongodb.ObjectId(this._id) },
    //     { $set: { cart: updateCart } }
    //   )
    //   .then()
    //   .catch();
  }

  getCart() {
    const db = getDB();

    const itemIdsInCart = this.cart.items.map((index) => {
      return index.productId;
    });

    return db
      .collection("Books")
      .find({ _id: { $in: itemIdsInCart } })
      .toArray()
      .then((items) => {
        return items.map((newItemsArrIndex) => {
          return {
            ...newItemsArrIndex,
            quantity: this.cart.items.find((index) => {
              return (
                index.productId.toString() === newItemsArrIndex._id.toString()
              );
            }).quantity,
          };
        });
      });
  }

  static findById(userId) {
    const db = getDB();
    return db
      .collection("Users")
      .findOne({ _id: mongodb.ObjectId(userId) })
      .then()
      .catch();
  }
}

module.exports = User;
