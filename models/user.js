// const mongodb = require("mongodb");
// const getDB = require("../util/database").getDB;

// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save() {
//     const db = getDB();
//     return db.collection("Users").insertOne(this);
//   }

//   addToCart(book) {
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === book._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new ObjectId(book._id),
//         quantity: newQuantity,
//       });
//     }
//     const updateCart = {
//       items: updatedCartItems,
//     };
//     const db = getDB();
//     return db
//       .collection("Users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: updateCart } }
//       )
//       .then()
//       .catch();
//   }

//   getCart() {
//     const db = getDB();

//     const itemIdsInCart = this.cart.items.map((index) => {
//       return index.productId;
//     });

//     return db
//       .collection("Books")
//       .find({ _id: { $in: itemIdsInCart } })
//       .toArray()
//       .then((items) => {
//         return items.map((newItemsArrIndex) => {
//           return {
//             ...newItemsArrIndex,
//             quantity: this.cart.items.find((index) => {
//               return (
//                 index.productId.toString() === newItemsArrIndex._id.toString()
//               );
//             }).quantity,
//           };
//         });
//       });
//   }

//   deleteCartItem(bookdId) {
//     const newCart = this.cart.items.filter((item) => {
//       return item.productId.toString() !== bookdId.toString();
//     });
//     const db = getDB();
//     return db
//       .collection("Users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: newCart } } }
//       )
//       .then()
//       .catch();
//   }

//   addOrder() {
//     const db = getDB();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           user: {
//             _id: new ObjectId(this._id),
//             name: this.username,
//           },
//           items: products,
//         };
//         return db.collection("Orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection("Users")
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       });
//   }

//   getOrders() {
//     const db = getDB();
//     return db
//       .collection("Orders")
//       .find({ "user._id": new ObjectId(this._id) })
//       .toArray();
//   }

//   static findById(userId) {
//     const db = getDB();
//     return db
//       .collection("Users")
//       .findOne({ _id: mongodb.ObjectId(userId) })
//       .then()
//       .catch();
//   }
// }

// module.exports = User;
