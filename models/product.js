const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDB();
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

  static findById(title) {
    const db = getDB();
    return db
      .collection("Books")
      .find({ _id: bookID })
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
