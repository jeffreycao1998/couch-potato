# Couch Potato

Live preview on Heroku: [Couch Potato](https://couch-potatoez.herokuapp.com/).

# Order Placement

At the checkout screen, if you choose to pay with 'Card' you'll be brought to a stripe checkout session. Since this is a fictitious website you'll need a fictitious credit card! To test out the stripe checkout use the visa card # 4242 4242 4242, any expiry date in the future, and any cvv number.

# /employee Route

Before entering this route, you should place an order or to or else all you'll see is a blank screen. Once you've placed a couple orders and logged in you'll see the order's details like order number and items ordered and at the bottom of each card you'll see a few buttons to set how many minutes in the future it'll be ready. If you click this button it'll move over to the 'processing orders' section and the bottom of the card will show the order's 'pickup time'. Setting the time of the pickup also sends a text message to the customer, via twilio, notifying them of the pickup time.

## /employee Route Login

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
