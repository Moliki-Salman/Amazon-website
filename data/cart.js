
export let cart = JSON.parse(localStorage.getItem("cart"));
//the esence of saving our cart with local storageis to save whateverwe have saved in the  cart because if this is not done, once the page isdone everything in the pagefreshes and forgets every action done on the page.

// this gives the cart a default value, so thatit doesnt throw a null error.
if (!cart) {
  cart = [
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
  ];
}

//save cart to local storage.local storage can lnly save strings. the first parameter in localstorage method is the name we want to attribute to the localstorage and the second parameter is the string that will be saved. JSON
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  /* Steps to increase the number of quatity in the cart (object in cart Array) if a customer wants to buy two or more of the same product:
        1-check if the product is already in the cart.
        2- if product is the cart, increase the quantity.
        3-if it is not in the cart, add it to the cart.
        */
  //to check if a product is already in the cart, we loop through the cart array
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  //if product is the cart, increase the quantity. Note: the  quantity can be found below when we add a product to cart.
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    // adding a product to the cart
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

/* STEPS TO REMOVE A PRODUCT FROM CAER
1-create a new array
2- Loop through the cart
3-Add each product to the newArray except this productId
*/
export function removeFromCart(productId) {
  const newCart = [];

  //the loop result will contain all the product that do notmatch the product that was deleted
  cart.forEach((cartItem) => {
    //if cartItem is notequal to the productId we are looking,for, add it to the newCart.
    if (cartItem !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

/*
STEPS:
1-loop through the cart and find the product
2- update the delivery option id of the product

*/

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
