const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");
const dbConfig = require("./config/dbConfig.json");
const serverConfig = require("./config/serverConfig.json");
const URI = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.cluster}`;

const app = express();
const store = new MDBStore({
  uri: URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: serverConfig.secret,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      console.log(user);
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(URI)
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
    const server = app.listen(3000, () =>
      console.log(
        "\x1b[35m",
        `Local:  http://localhost:${server.address().port}`
      )
    );
  })
  .catch((error) => console.log(error));
