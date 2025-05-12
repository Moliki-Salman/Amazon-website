import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("adds and existing product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });

    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //expect localstorage.serItem to be called once insideaddToCart()
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    // expect(cart[0].quantity).toEqual(2);
  });

  it("adds a new product to the cart", () => {
    //mocking localStorage.setItem to add cart to localstorage
    spyOn(localStorage, "setItem");

    //mocking localStorage.getItem() to return an empty array
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage(), //this is rerun the cart to add an item to the cart, then mocking spyOn(localStorage, "setItem") will run to all cart be added to localstoragewhich will make the test pass
      addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //expect localstorage.serItem to be called once insideaddToCart()
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});

/*
The BEST practice for testing your project is to:
1- test all the functions in  your project
2- Test each conditions of all if statements; this is known as TEST Coverage. Test coverage is known as how much of the code is being tested. best practice is try to maximixe our test coverage.

-Mocks = lets us replace a method with a fake version. we can use the mock to do anything. In the cart.js filr the cart is stored using local storage, thus the test  it("adds a new product to the cart" may pass or fail depending if the local storage is empty or not, do dolve this, we are mocking the  localStorage.getItem("cart")function to mock it to return an empty local storage. The mock function for Jasmine is spyOne()   */
