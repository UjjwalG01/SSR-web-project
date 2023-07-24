const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");
const expressLayouts = require("express-ejs-layouts");
const app = express();

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/food_system_new");
    console.log("Connected Successfully");
  } catch (e) {
    console.log("Connection Failed: " + e.message);
  }
}
connectDB();

app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  })
);

app.use(cookieParser());
app.use(fileUpload());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(expressLayouts);
app.set("layout", "layouts/app");

app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = req.flash();
  res.locals.username = req.session?.user?.name ?? "Guest";
  res.locals.isLogin = req.session?.user ? true : false;
  next();
});

app.use(require("./app/routes/client"));

const auth = require("./app/middleware/authMiddleware");

app.use(auth);
app.use("/food", require("./app/routes/food"));
app.use(require("./app/routes/category"));
app.use(require("./app/routes/banner"));

app.listen(3000, () => {
  console.log("Listening on 3000");
});
