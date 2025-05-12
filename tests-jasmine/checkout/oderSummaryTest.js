import { renderOrderSummary } from "../../script/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

describe("test suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  //Hooks:Hooks let us run some code for each test. Thehook share code between our test and removes duplication.
  beforeEach(() => {
    //it is recommended not to modify local storage, so we wil mock setItem
    spyOn(localStorage, "setItem");

    //geting the cart fromHTML and be able to addto the HTML PAGE
    document.querySelector(".js-test-comtainer").innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>`;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  it("displays the cart", () => {
    //to check if we have two of this element on the page
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    //removing the HTML, its taking more sapce on the page
  });

  it("removes a product", () => {
    //this will click delete on the first product and remove it.
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    ////to check if the cart array is upadated
    expect(cart.length).toEqual(2);
    expect(cart[1].productId).toEqual(productId2);
  });
  afterEach(() => {
    document.querySelector(".js-test-comtainer").innerHTML = "";
  });
});

/*when testing a page,you nned to test:
1- how thw page looks
2- how thepage behave.
*/
