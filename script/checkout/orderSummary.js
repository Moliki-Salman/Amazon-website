import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";

/*when we select a delivery Option, we  ned to update the page.you can update the page by reruning the html code and regenerate all the html. Do this buy putting alll the codes in a function and rerun the function.we put all the previous code in a function*/

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    //use thisto search for the product from product.js
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOptions.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
      <div class="cart-item-container
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date:${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity js-product-quantity-${
                    matchingProduct.id
                  }">
                    <span>
                      Quantity: <span class="quantity-label">${
                        cartItem.quantity
                      }</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${
                      matchingProduct.id
                    }" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
        </div>
  `;
  });

  /*
  STEPS
  1-Loop through the deliveryoptions we created earlier.
  2- For each option, generate some HTML,
  3- Combine the HTML together.
  */
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOptions.priceCents === 0
          ? "Free"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
        <div class="delivery-option js-delivery-option" data-product-id="${
          matchingProduct.id
        }"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
              ${isChecked ? "checked" : ""}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
            </div>
        </div>
      `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId); //update the data

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();

      renderPaymentSummary(); //regerated all the html
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId); //updated our data(Model)
      renderOrderSummary(); //Recursion was done here, thi is where we rerun the code ny regenerating all the html. explanation below. then the updated Model regenerates the View here.

      renderPaymentSummary(); //regerated all the html
    });
  });
}

/*
      -Note: we are calling the renderOrderSummary() function inside renderOrderSummary() function; this is possibele because a function can actually call or rerun itself and this feuture is called RECURSION. recursion is useful when a function needs to rerun all of its code..
      Summmary: 1:update the data and 2- Regenerate all the HTML = MVC
      MVC means Model-View-Controller.

      In MVC: We splits our code into 3 parts:
        1- Model = Saves and manages the data. In this project our data folder is the model
        2- View = takes the data and displays it on the page: In this project, the checkout.js is the view.
        3- Controller = runs some codes when we interact with the page. In the projects the eventlisteners because they do something when er interact with the page.
        -Thus the Model is used to generate the view and when the View (page) isinteracted with, it will run some Controllers.And the the controller will update the Model. Then the updated Model regenerates the View.
        Summary:MVC =makes sure the pages always mayches the data. MVC is known as a design pattern. is a way to organise and design our code.
          -You can also use javascript frameworks to build and design your website. Many Javascrips frameworks are based on MVC
        */

/*practice code to learn external libraries

hello();
 dayjs() is an external liberary that was loaded from the internet. find it in checkout.html under script. once it has been loaded incheckout.html, you can use the function dirrectly here. The best practice is to use ESM. However, some liberaries dont have ESM, So you need to use a script tag in html to import them./*
ESM Version is a version that works with JavaScript Modules.
ESM = EcmaScript Module
( EcmaScript  = JavaScript); EcmaScript is another name for JavaScript.

CALCULATE DELIVERY DATE
1-Get todays date
2- Do calculation(Add 7days,....)
3-Display the date in easy to read format.

const today = dayjs();
const deliveryDate = today.add(7, "days"); //it added 7day to today
console.log(deliveryDate.format("dddd, MMMM D")); // .format() helps to display the date in an easy to read format.
*/
