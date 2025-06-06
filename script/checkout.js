import { renderOrderSummary } from "../script/checkout/orderSummary.js";
import { renderPaymentSummary } from "../script/checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import "../data/cart-class.js";
//import  "../data/backend-practice.js"

//async makes a function return a promise, it basically raps the code in a promise
//await let us wait for a promise to finish beforegoing to the next line. Thus, await lets us write asyncronous code like normal code
// you can also use try/catch inside a normal code, not only for async/awai
//throw: is used for manually creating an eror inside a try/catch
//reject: is a function that let us create an error in the future

async function loadPage() {
  try {
    //throw "error1";
    await loadProductsFetch(); // it will wait for this line to finsih, get the response from backend before moving to the nect line

    const value = await new Promise((resolve, reject) => {
      //throw "error2";
      loadCart(() => {
        //reject("error3");
        resolve();
      });
    });
  } catch (error) {
    console.log("unexpected error: Please try again later");
  }

  renderOrderSummary();
  renderPaymentSummary();

  return "value4"; // this converts or also mean resolve(value 4). Remember that the value of the return can be saved in the parameter of the next step which is in the .then()
}

loadPage();

//console.log(value); // this is the value of the return above. whatever the async or the promise return, it is saved as a parameter for the next step .then() in the case of a promise, but the value is save into a new variable inside of an async/await

//Promise.all() : let us run multiple promise at the same time and wait for all of them to finish.
/*
Promise.all([
  loadProductsFetch(),
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
*/

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
