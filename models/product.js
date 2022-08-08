const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

class Product {
  constructor(title, price, description, imageUrl, _id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new mongodb.ObjectId(_id);
  }

  save() {
    const db = getDB();
    if (this._id) {
      return db
        .collection("Books")
        .updateOne({ _id: this._id }, { $set: this })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return db
        .collection("Books")
        .insertOne(this)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  static findAll() {
    const db = getDB();
    return db
      .collection("Books")
      .find()
      .toArray()
      .then((books) => {
        console.log(books);
        return books;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByID(bookID) {
    const db = getDB();
    return db
      .collection("Books")
      .find({ _id: new mongodb.ObjectId(bookID) })
      .next()
      .then((book) => {
        return book;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
