const express = require("express");
const app = express();
const mongo = require("./config/database");
const loginRouter = require("./routes/routerLogin");
const signUpRouter = require("./routes/routerSignUp");
const bookRouter = require("./routes/routerBook");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine(
  ".hbs",
  expressHbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "views/layouts/",
  })
);
app.set("view engine", "hbs");

mongo.connect();
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use("/book", bookRouter);

app.use(function (req, res, next) {
  console.log("404 - Khong tim thay trang");
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
