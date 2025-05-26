import { renderOrderSummary } from "../script/checkout/orderSummary.js";
import { renderPaymentSummary } from "../script/checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import "../data/cart-class.js";
//import  "../data/backend-practice.js"

//Promise.all() : let us run multiple promise at the same time and wait for all of them to finish.
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve("value1");
    });
  }),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((value) => {
  console.log(value);
  renderOrderSummary();
  renderPaymentSummary();
});

//PROMISE: it allows javascript to do multiple things at the same time
//the promise() function runs immediately
//resolve() let us control when we go to the next step
/*new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1");
  });
})
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });

loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
/*
STEPS:
1-Loop through the cart.
2-for each product, price amd quantity,
3- Add everything together
*/
