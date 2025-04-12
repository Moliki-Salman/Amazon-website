import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
/*
Step 1: Saving the data (data stucture)
step 2: Use the data to generate the HTML: you can loop through the Array.
step 3: make it interactive
*/

/*HERE IS STEP 1
the first is loading the data on the html File. the data file has been loaded in script inside amazon.html*/

/* HERE IS STEP 2
//the way forEach() works is that it takes each object saves it in this parameter  called product and then runs the functiion;
//for each of the product/object in the array, we create some HTML*/

let productsHTML = ""; // here we combine all the HTML string into this variable

//the products Array below  is found inside the data.products.js folder and it is loaded inside the amazon.html file under script. so it automatically works
products.forEach((product) => {
  //each time we go through the loop we add all the HTML strings up at (let productsHTML = ''; thus we make productsHTML add to it self which is productsHTML = productsHTML plus the string which is the the same as the accumulator pattern bellow +=; thus we loop through an array an each time we are accumulating the result.
  productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>


            <!–– COMMENT-the image has to exist in the sourse code/path. Note, we only have rating-45.png in the image folder that is why I am multiplying 4.5  by 10 to corrolate it with the existing image in the folder (the  object: product.image.stars * 10)––>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <!-- 100 cents = 1 doller. to save the prices in dollers on the page -->
            $${formatCurrency(
              product.priceCents
            )} <!-- toFixed() convertsthe number to strings and makes it have2 decimals-->
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

            <!––COMMENT-Data Atribute in HTML:  it allows to attach any feuture to an element.
            SYNTAX FOR DATA ATTRIBUTE:
            1-is just an HTML attribute
            2- it has to start with "data-"
            3- then give it any name e.g <"data-product-name
            Note  that we have to separate the words with a dash, which known as KEBAB CASE,  IN HTML LIKE THIS; data-product-name––>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id ="${product.id}">
            Add to Cart
          </button>
        </div>`;
});

/* HERE IS STEP 3:
    combine all the HTML and put it on the web page by using the DOM, DOM is when you get the HTML on the page and put it inside JavaScript.
    //the .innerHTML properties enable to change the HTML clas that iselected using javascript. thus here we are able to change the HTML to  productsHTML
    */
document.querySelector(".js-products-grid").innerHTML = productsHTML;

function updateCartQuantity() {
  /*STEPS TO UPDATE CART QUANTITY
   1-calculate the cart quantity
    2-Put the quantity on the page using the DOM
  */
  //Calculate the total quantity
  // loop thorugh each object in the cart
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    //add all the item quantity and save it into the variable cartQuantity
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    /*
      //Getting a product from HTMLwhen the button is clicked
      //the dataset attribute will display all the data-product-name in the html.The dataset gives us all the attribute that are attached to our product. also the dataset attribute works like an object. NOTE; the product name must be in Camel casing here */
    // const productName = button.dataset.productName;
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
});

/*Module: contains a variable inside a file by prevently anform of conflict is another file has the same variable name.
CREATE A MODULE:
1-create a file
2-Dont load the file with a script tag <script> by doing this any variable we create inside the file will be contained inside the file and will not cause NAMING CONFLICTS.
*/

/*
GETTING A VARIABLE OUT OF A FILE
1-Add type= "module" attribute: the type= "module" attibute basically let a file get variables out of other files.
2- Export
3- Import
*/
