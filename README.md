## Couch Potato
> :warning: **Because Heroku turns off the server after a few minutes of inactivity you have to wait for it to spin up when you first go to the website and then refresh the page before everything starts working. In the mean time, look at the pretty pictures below :)**

Live preview on Heroku: [Couch Potato](https://couch-potatoez.herokuapp.com/).

## Pages
# Home Page
![](https://i.gyazo.com/fa7ca86e4d0e712b8bca55c58c83576f.jpg)

# Menu
![](https://i.gyazo.com/a1fe876a12d786d76f667ce580c2ae6f.jpg)

# Cart
![](https://i.gyazo.com/617aab9fbc6dc4c323937508cbb59804.png)

# Order Form
![](https://i.gyazo.com/7892e822b378c58b466689e8701e692d.png)

# Stripe Checkout
![](https://i.gyazo.com/9a08b30ff3f77cdbaf281b53a8986e79.png)

# Confirmation Page (Directions to the "store". I don't have a real store so I used the Toronto Zoo)
![](https://i.gyazo.com/ab8f4af0e33d86e5fc37328ee458a18a.png)

# Text Message Confirmation via Twilio
![](https://i.gyazo.com/61c2b75cf1201e3eab0afa518b3a5335.png)

# Order Lookup (from the home page)
![](https://i.gyazo.com/4ed0a2b93b7a5816a09955a862147538.png)

# Real-Time Orders Management System for Employees
![](https://i.gyazo.com/3ff9704e671547caa29bba4e86c6ae3b.png)

# Order Placement

At the checkout screen, if you choose to pay with 'Card' you'll be brought to a stripe checkout session. Since this is a fictitious website you'll need a fictitious credit card! To test out the stripe checkout use the visa card # 4242 4242 4242, any expiry date in the future, and any cvv number.

# /employee Route

Before entering this route, you should place an order or to or else all you'll see is a blank screen. Once you've placed a couple orders and logged in you'll see the order's details like order number and items ordered and at the bottom of each card you'll see a few buttons to set how many minutes in the future it'll be ready. If you click this button it'll move over to the 'processing orders' section and the bottom of the card will show the order's 'pickup time'. Setting the time of the pickup also sends a text message to the customer, via twilio, notifying them of the pickup time.

username: potatohead

password: potatohead

## Technology Implemented

- Twilio
- Stripe
- Socket.io
- PostgreSQL
- Express
- Google Maps API
- Node
- Cookie-session
- jQuery
- SCSS
- EJS
- Axios
