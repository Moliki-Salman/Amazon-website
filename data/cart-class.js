class Cart {
  cartItems;
  localStorageKey = undefined;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    // businessCart.localStorageKey = "cart-business";

    this.loadFromStorage();
    // businessCart.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    if (!this.cartItems) {
      this.cartItems = [
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
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      // adding a product to the cart
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }

    //this is added to access the function inside the object
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

const cart = new Cart("cart-oop"); // this generates new object using the class
const businessCart = new Cart("cart-business"); //note: each object we generate from the class is an INSTANCE of the class

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart); //how to check an instance of a class. it will result to true

//Class : is a better way to generate object. it is considered an object generator.
/*
Object Oriented programming = Organizing our code into Objects (tries  to represent the real world);
Class = helps us generate these objects.
Benfits of classes
1-Constuctur: it is a feature that allows to run set up code inside an object.
*/
