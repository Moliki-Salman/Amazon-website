import { renderOrderSummary } from "../script/checkout/orderSummary.js";
import { renderPaymentSummary } from "../script/checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//import "../data/cart-class.js";
//import  "../data/backend-practice.js"

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

/*
STEPS:
1-Loop through the cart.
2-for each product, price amd quantity,
3- Add everything together
*/
