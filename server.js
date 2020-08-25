require('dotenv').config();
const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const morgan        = require('morgan');
const cors          = require('cors');
const db            = require('./database');
const cookieSession = require('cookie-session');

// Routes
const apiRoutes    = require("./routes/api");
const ordersRoutes = require("./routes/orders");
const employeeRoute = require("./routes/employee");

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(morgan('dev'));
app.use(cors());

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ['blahblah'],
}));

app.use("/api", apiRoutes(db));
app.use("/orders", ordersRoutes(db));
app.use("/employee", employeeRoute(db));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
