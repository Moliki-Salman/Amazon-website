export const cart = [];

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
