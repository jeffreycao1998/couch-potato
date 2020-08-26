require('dotenv').config();
const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const server        = require('http').createServer(app);
const morgan        = require('morgan');
const cors          = require('cors');
const db            = require('./database');
const cookieSession = require('cookie-session');

// Routes
const apiRoutes    = require("./routes/api");
const ordersRoutes = require("./routes/orders");
const employeeRoute = require("./routes/employee");

const io = require('socket.io')(server);

let ownerSocket;

io.on('connection', socket => {
  socket.on('owner connected', () => {
    console.log('owner connected');
  });

  socket.on('order placed', () => {
    console.log('order placed');
    console.log(socket.id);
  });
});

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
app.use(express.static(__dirname + '/node_modules'));

app.use(cookieSession({
  name: 'session',
  keys: ['blahblah'],
}));

app.use("/api", apiRoutes(db, io));
app.use("/orders", ordersRoutes(db, io));
app.use("/employee", employeeRoute(db, io));

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});
