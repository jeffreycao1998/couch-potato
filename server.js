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
const stripe        = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Routes
const apiRoutes    = require("./routes/api");
const ordersRoutes = require("./routes/orders");
const employeeRoute = require("./routes/employee");

const io = require('socket.io')(server);

let ownerSocket = null;

io.on('connection', socket => {
  socket.on('owner connected', () => {
    ownerSocket = socket.id;
  });

  socket.on('order placed', (data) => {
    io.to(ownerSocket).emit('order placed', data)
  });

  socket.on('disconnect', () => {
    if (socket.id === ownerSocket) {
      ownerSocket = null;
    }
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

app.post("/create-checkout-session", async (req, res) => {
  const items = req.body.cart;
  const products = [];

  for (let item in items) {
    products.push({
      price_data: {
        currency: 'cad',
        product_data: {
          name: items[item].name,
        },
        unit_amount: items[item].price,
      },
      quantity: items[item].quantity
    })
  }

  let total = 0;
  for (let product of products) {
    total += product.price_data.unit_amount * product.quantity * .13;
  }

  products.push({
    price_data: {
      currency: 'cad',
      product_data: {
        name: 'Tax',
      },
      unit_amount: Math.round(total),
    },
    quantity: 1
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      ...products,
    ],
    mode: "payment",
    success_url: "https://couch-potatoez.herokuapp.com/orders/confirmation",
    cancel_url: "https://couch-potatoez.herokuapp.com/orders/checkout",
  });

  res.json({ id: session.id });
});

server.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});
