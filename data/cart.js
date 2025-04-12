export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

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
    });
  }
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

cart = newCart
}
