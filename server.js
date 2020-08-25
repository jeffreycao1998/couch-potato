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

io.on('connection', socket => {
  console.log('Socket connected');
  socket.on('join', (data) => {
    console.log(data);
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

app.use("/api", apiRoutes(db));
app.use("/orders", ordersRoutes(db));
app.use("/employee", employeeRoute(db));

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(PORT, () => {
  console.log('Sockets running on port 4200');
});
