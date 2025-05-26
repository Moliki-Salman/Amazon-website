import { getDeliveryOption } from "../../data/deliveryOption.js";
import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder, orders } from "../../data/order.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOptions = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOptions.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  let paymentSummaryHTML = `
    <div class="payment-summary-title   js-payment-summary">Order Summary</div>

      <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$
          ${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$
          ${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$
          ${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

      <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$
        ${formatCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
      <div>Order total:</div>
        <div class="payment-summary-money">$
          ${formatCurrency(totalCents)}</div>
        </div>

      <button class="place-order-button button-primary js-place-order">
        Place your order
      </button>`;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  //when we click the button, we will make a request to the backend to place the order
  //send some data to the backendend, some our cart
  //headers gives the backend more information about our request
  //content-Type: tells the backend what type of data we are sending
  //JSON.stringify: converts the object to a string so the backend can use it.
  // response.jscon(): is used to get the response from backend and it is a promise that is why it has an await
  //window.location: is a specialobject that helps to display the URL in the browd=ser oage
  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });

        const order = await response.json();
        addOrder();
      } catch (error) {
        console.log("unexpected try again letter");
      }

      //how to go to the orders page after placing anorder
      //this will change the URL OBJECT IN THE BROUSWER. BECUASE THIS PAGE displays thecheckout.html, the code below will change the path to ...../"orders.HTML"
      window.location.href = "orders.html";
    });
}
