const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
// const mongodb = require("mongodb");
// const getDB = require("../util/database").getDB;

// class Product {
//   constructor(title, price, description, imageUrl, _id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = _id ? new mongodb.ObjectId(_id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDB();
//     if (this._id) {
//       return db
//         .collection("Books")
//         .updateOne({ _id: this._id }, { $set: this })
//         .then((result) => {
//           console.log(result);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       return db
//         .collection("Books")
//         .insertOne(this)
//         .then((result) => {
//           console.log(result);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }

//   static delete(bookId) {
//     const db = getDB();
//     return db
//       .collection("Books")
//       .deleteOne({ _id: new mongodb.ObjectId(bookId) })
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findAll() {
//     const db = getDB();
//     return db
//       .collection("Books")
//       .find()
//       .toArray()
//       .then((books) => {
//         return books;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(bookId) {
//     const db = getDB();
//     return db
//       .collection("Books")
//       .find({ _id: new mongodb.ObjectId(bookId) })
//       .next()
//       .then((book) => {
//         return book;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
