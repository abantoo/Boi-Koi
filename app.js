const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const config = require("./config/dbConfig.json");
const uri = `mongodb+srv://${config.username}:${config.password}@sandbox.rhg6i.mongodb.net/?retryWrites=true&w=majority`;
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("62ffba8afd08be870f1d8769")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(uri)
  .then((result) => {
    User.findOne().then((result) => {
      if (!result) {
        const user = new User({
          name: "Palpatine",
          email: "palpatine@sith.empire",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
    console.log("\x1b[35m", "Local: http://localhost:3000");
  })
  .catch((error) => console.log(error));
