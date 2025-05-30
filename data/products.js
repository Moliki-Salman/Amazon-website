import { formatCurrency } from "../script/utils/money.js";

export function getProduct(productId) {
  //use thisto search for the product from product.js
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

//using a CLass to generate object
class Product {
  id;
  image;
  rating;
  priceCents;

  //remember constructor is the setup code, where you add the values to the property.Thus when ever we generate an object it will automatically run the constructor.
  // the productDetails here is the paprmeter where we save the  all data coming from any new class object that is created from  new Product()
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  //Method to calculate stars, it allows each product to be able to constructs its own starUrl
  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    //the parent class has to have the same method as the child class but the method in the child class can overide the pareny class
    return "";
  }
}

class Clothing extends Product {
  sizeChartLink;
  constructor(productDetails) {
    super(productDetails); //calls and inheritring the parent constructur.
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  //METHOD OVERIDING: this will over ride the method in the parent class
  extraInfoHTML() {
    // super.extraInfoHTML() calls and inheriting the parent method
    return `
    <a href="${this.sizeChartLink}"  target="_blank">
    Size Chart
    </a>
    `;
  }
}

/*const date = new Date()
console.log(date)
console.log(date.toLocaleTimeString())
*/

//loading the product from the backend
export let products = [];

//Fetch() is a better way to make http request. Fetch uses a Promise
export function loadProductsFetch() {
  const promise = fetch("https://supersimplebackend.dev/products")
    .then((response) => {
      //when we return; we are instructing the promise to wait for it to finish before going to the next step
      return response.json();
    })
    .then((productData) => {
      products = productData.map((productDetails) => {
        if (productDetails.type === "clothing") {
          return new Clothing(productDetails);
        }
        return new Product(productDetails); //here we just convert each object in the array to class
      });

      console.log("load products");
    })
    .catch((error) => {
      console.log("unexpected error: Please try again later");
    });

  return promise;
}

/*
loadProductsFetch().then(() => {
  console.log("next step");
});
*/

//makking http request with a XMLHttpRequest which ueses a callback funtion
export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Product(productDetails); //here we just convert each object in the array to class
    });

    console.log("load products");
    fun();
  });

  //error handling using callback, basically creating a seperate function for callbacks error
  xhr.addEventListener("error", (error) => {
    console.log("unexpected error: Please try again later");
  });

  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}

//put all the HTML CODE in a function and then put them into the product function

/*
//Generating a product using the class
export const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"],
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127,
    },
    priceCents: 2095,
    keywords: ["sports", "basketballs"],
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799,
    keywords: ["tshirts", "apparel", "mens"],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png",
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197,
    },
    priceCents: 1899,
    keywords: ["toaster", "kitchen", "appliances"],
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/products/6-piece-white-dinner-plate-set.jpg",
    name: "6 Piece White Dinner Plate Set",
    rating: {
      stars: 4,
      count: 37,
    },
    priceCents: 2067,
    keywords: ["plates", "kitchen", "dining"],
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "images/products/6-piece-non-stick-baking-set.webp",
    name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
    rating: {
      stars: 4.5,
      count: 175,
    },
    priceCents: 3499,
    keywords: ["kitchen", "cookware"],
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
    name: "Plain Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 317,
    },
    priceCents: 2400,
    keywords: ["hoodies", "sweaters", "apparel"],
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "images/products/luxury-tower-set-6-piece.jpg",
    name: "Luxury Towel Set - Graphite Gray",
    rating: {
      stars: 4.5,
      count: 144,
    },
    priceCents: 3599,
    keywords: ["bathroom", "washroom", "restroom", "towels", "bath towels"],
  },
  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    image: "images/products/liquid-laundry-detergent-plain.jpg",
    name: "Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz",
    rating: {
      stars: 4.5,
      count: 305,
    },
    priceCents: 2899,
    keywords: ["bathroom", "cleaning"],
  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "images/products/knit-athletic-sneakers-gray.jpg",
    name: "Waterproof Knit Athletic Sneakers - Gray",
    rating: {
      stars: 4,
      count: 89,
    },
    priceCents: 3390,
    keywords: ["shoes", "running shoes", "footwear"],
  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "images/products/women-chiffon-beachwear-coverup-black.jpg",
    name: "Women's Chiffon Beachwear Cover Up - Black",
    rating: {
      stars: 4.5,
      count: 235,
    },
    priceCents: 2070,
    keywords: ["robe", "swimsuit", "swimming", "bathing", "apparel"],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png",
  },
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    image: "images/products/round-sunglasses-black.jpg",
    name: "Round Sunglasses",
    rating: {
      stars: 4.5,
      count: 30,
    },
    priceCents: 1560,
    keywords: ["accessories", "shades"],
  },
  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    image: "images/products/women-beach-sandals.jpg",
    name: "Women's Two Strap Buckle Sandals - Tan",
    rating: {
      stars: 4.5,
      count: 562,
    },
    priceCents: 2499,
    keywords: ["footwear", "sandals", "womens", "beach", "summer"],
  },
  {
    id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
    image: "images/products/blackout-curtain-set-beige.webp",
    name: "Blackout Curtains Set 4-Pack - Beige",
    rating: {
      stars: 4.5,
      count: 232,
    },
    priceCents: 4599,
    keywords: ["bedroom", "curtains", "home"],
  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    image: "images/products/men-slim-fit-summer-shorts-gray.jpg",
    name: "Men's Slim-Fit Summer Shorts",
    rating: {
      stars: 4,
      count: 160,
    },
    priceCents: 1699,
    keywords: ["shorts", "apparel", "mens"],
  },
  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    image: "images/products/electric-glass-and-steel-hot-water-kettle.webp",
    name: "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter",
    rating: {
      stars: 5,
      count: 846,
    },
    priceCents: 3074,
    keywords: ["water boiler", "appliances", "kitchen"],
  },
  {
    id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
    image: "images/products/facial-tissue-2-ply-18-boxes.jpg",
    name: "Ultra Soft Tissue 2-Ply - 18 Box",
    rating: {
      stars: 4,
      count: 99,
    },
    priceCents: 2374,
    keywords: ["kleenex", "tissues", "kitchen", "tissues box", "napkins"],
  },
  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    image: "images/products/straw-sunhat.webp",
    name: "Straw Lifeguard Sun Hat",
    rating: {
      stars: 4,
      count: 215,
    },
    priceCents: 2200,
    keywords: ["hats", "straw hats", "summer", "apparel"],
  },
  {
    id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
    image: "images/products/sky-flower-stud-earrings.webp",
    name: "Sterling Silver Sky Flower Stud Earrings",
    rating: {
      stars: 4.5,
      count: 52,
    },
    priceCents: 1799,
    keywords: ["jewelry", "accessories", "womens"],
  },
  {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    image: "images/products/women-stretch-popover-hoodie-black.jpg",
    name: "Women's Stretch Popover Hoodie",
    rating: {
      stars: 4.5,
      count: 2465,
    },
    priceCents: 1374,
    keywords: ["hooded", "hoodies", "sweaters", "womens", "apparel"],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png",
  },
  {
    id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
    image: "images/products/bathroom-rug.jpg",
    name: "Bathroom Bath Rug Mat 20 x 31 Inch - Grey",
    rating: {
      stars: 4.5,
      count: 119,
    },
    priceCents: 1250,
    keywords: ["bathmat", "bathroom", "home"],
  },
  {
    id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
    image: "images/products/women-knit-ballet-flat-black.jpg",
    name: "Women's Knit Ballet Flat",
    rating: {
      stars: 4,
      count: 326,
    },
    priceCents: 2640,
    keywords: ["shoes", "flats", "womens", "footwear"],
  },
  {
    id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
    image: "images/products/men-golf-polo-t-shirt-blue.jpg",
    name: "Men's Regular-Fit Quick-Dry Golf Polo Shirt",
    rating: {
      stars: 4.5,
      count: 2556,
    },
    priceCents: 1599,
    keywords: ["tshirts", "shirts", "apparel", "mens"],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png",
  },
  {
    id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
    image: "images/products/trash-can-with-foot-pedal-50-liter.jpg",
    name: "Trash Can with Foot Pedal - Brushed Stainless Steel",
    rating: {
      stars: 4.5,
      count: 2286,
    },
    priceCents: 8300,
    keywords: ["garbage", "bins", "cans", "kitchen"],
  },
  {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    image: "images/products/duvet-cover-set-blue-twin.jpg",
    name: "Duvet Cover Set with Zipper Closure",
    rating: {
      stars: 4,
      count: 456,
    },
    priceCents: 2399,
    keywords: ["bedroom", "bed sheets", "sheets", "covers", "home"],
  },
  {
    id: "d2785924-743d-49b3-8f03-ec258e640503",
    image: "images/products/women-chunky-beanie-gray.webp",
    name: "Women's Chunky Cable Beanie - Gray",
    rating: {
      stars: 5,
      count: 83,
    },
    priceCents: 1250,
    keywords: ["hats", "winter hats", "beanies", "tuques", "apparel", "womens"],
  },
  {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    image: "images/products/men-chino-pants-beige.jpg",
    name: "Men's Classic-fit Pleated Chino Pants",
    rating: {
      stars: 4.5,
      count: 9017,
    },
    priceCents: 2290,
    keywords: ["pants", "apparel", "mens"],
  },
  {
    id: "1c079479-8586-494f-ab53-219325432536",
    image: "images/products/men-athletic-shoes-green.jpg",
    name: "Men's Athletic Sneaker",
    rating: {
      stars: 4,
      count: 229,
    },
    priceCents: 3890,
    keywords: ["shoes", "running shoes", "footwear", "mens"],
  },
  {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    image: "images/products/men-navigator-sunglasses-brown.jpg",
    name: "Men's Navigator Sunglasses Pilot",
    rating: {
      stars: 3.5,
      count: 42,
    },
    priceCents: 1690,
    keywords: ["sunglasses", "glasses", "accessories", "shades"],
  },
  {
    id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
    image: "images/products/non-stick-cooking-set-15-pieces.webp",
    name: "Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces",
    rating: {
      stars: 4.5,
      count: 511,
    },
    priceCents: 6797,
    keywords: ["cooking set", "kitchen"],
  },
  {
    id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
    image: "images/products/vanity-mirror-silver.jpg",
    name: "Vanity Mirror with Heavy Base - Chrome",
    rating: {
      stars: 4.5,
      count: 130,
    },
    priceCents: 1649,
    keywords: ["bathroom", "washroom", "mirrors", "home"],
  },
  {
    id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
    image: "images/products/women-french-terry-fleece-jogger-camo.jpg",
    name: "Women's Fleece Jogger Sweatpant",
    rating: {
      stars: 4.5,
      count: 248,
    },
    priceCents: 2400,
    keywords: ["pants", "sweatpants", "jogging", "apparel", "womens"],
  },
  {
    id: "d339adf3-e004-4c20-a120-40e8874c66cb",
    image: "images/products/double-elongated-twist-french-wire-earrings.webp",
    name: "Double Oval Twist French Wire Earrings - Gold",
    rating: {
      stars: 4.5,
      count: 117,
    },
    priceCents: 2400,
    keywords: ["accessories", "womens"],
  },
  {
    id: "d37a651a-d501-483b-aae6-a9659b0757a0",
    image: "images/products/round-airtight-food-storage-containers.jpg",
    name: "Round Airtight Food Storage Containers - 5 Piece",
    rating: {
      stars: 4,
      count: 126,
    },
    priceCents: 2899,
    keywords: ["boxes", "food containers", "kitchen"],
  },
  {
    id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
    image: "images/products/coffeemaker-with-glass-carafe-black.jpg",
    name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
    rating: {
      stars: 4.5,
      count: 1211,
    },
    priceCents: 2250,
    keywords: ["coffeemakers", "kitchen", "appliances"],
  },
  {
    id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
    image: "images/products/blackout-curtains-black.jpg",
    name: "Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels",
    rating: {
      stars: 4.5,
      count: 363,
    },
    priceCents: 3099,
    keywords: ["bedroom", "home"],
  },
  {
    id: "8a53b080-6d40-4a65-ab26-b24ecf700bce",
    image: "images/products/cotton-bath-towels-teal.webp",
    name: "100% Cotton Bath Towels - 2 Pack, Light Teal",
    rating: {
      stars: 4.5,
      count: 93,
    },
    priceCents: 2110,
    keywords: ["bathroom", "home", "towels"],
  },
  {
    id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
    image: "images/products/knit-athletic-sneakers-pink.webp",
    name: "Waterproof Knit Athletic Sneakers - Pink",
    rating: {
      stars: 4,
      count: 89,
    },
    priceCents: 3390,
    keywords: ["shoes", "running shoes", "footwear", "womens"],
  },
  {
    id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
    image: "images/products/countertop-blender-64-oz.jpg",
    name: "Countertop Blender - 64oz, 1400 Watts",
    rating: {
      stars: 4,
      count: 3,
    },
    priceCents: 10747,
    keywords: ["food blenders", "kitchen", "appliances"],
  },
  {
    id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
    image: "images/products/floral-mixing-bowl-set.jpg",
    name: "10-Piece Mixing Bowl Set with Lids - Floral",
    rating: {
      stars: 5,
      count: 679,
    },
    priceCents: 3899,
    keywords: ["mixing bowls", "baking", "cookware", "kitchen"],
  },
  {
    id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
    image: "images/products/kitchen-paper-towels-30-pack.jpg",
    name: "2-Ply Kitchen Paper Towels - 30 Pack",
    rating: {
      stars: 4.5,
      count: 1045,
    },
    priceCents: 5799,
    keywords: ["kitchen", "kitchen towels", "tissues"],
  },
  {
    id: "bc2847e9-5323-403f-b7cf-57fde044a955",
    image: "images/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
    name: "Men's Full-Zip Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 3157,
    },
    priceCents: 2400,
    keywords: ["sweaters", "hoodies", "apparel", "mens"],
  },
].map((productDetails) => {
  if (productDetails.type === "clothing") {
    return new Clothing(productDetails);
  }
  return new Product(productDetails); //here we just convert each object in the array to class
});
*/

/*
convert object into a clothing class

EXPLAINATION OF THE ABBOVE
loup through the array  using the .map() method and use code to convert/generate the object.taking each object/value in the array and save it inside the parameter productDetails

//map usually creates a new array, when ever we return from this inner function, its going to go inside the new array. Thus the result will be put in a new array when we add return

diagram to explain a .map() method above :  we take each value in an array, we runs the function of it  and transform it and add it in a new array.Thus transforming each of the object into a class.
[
product1, ====> function ====> new product(product1);
product2 ====> function ====> new product(product2);
product3 ====> function ====> new product(product3);
]
*/

//inheretance let us reuse codebetween clases.This is where s class can get all the properties and methods from another class. Thus the child class inherites from the parent class, thus creating a relationship between classes.

/* The "this" feature used in n object or class lets an object access its own prperties and methods. However, in JavaScript  "this" can be used anywhere in our code
console.log(this); // this isresult to undefined because it not pointing to any object.


const object2 = {
  a: 2,
  b: this.a, // Object2 has not be created yet. this = undefined,
};

Thus, "this"  is usually used inside a method/function  that has objects, but this will not work  for just an ordinally object that is NOT inside a method/function.

console.log(object2.b)

function logThis(){
console.log(this) // i


*/
//Point 1: inside a Method, this poinyts to the outer object. it will work.
//Point 2:Inside a function, we can change this to whatever we want using a methos like the .call(). it will be undefined because although its inside a function, it is NOT pointing to an object inside the function. Thus it will only work for a  function/class that has an object inside of it.

function logThis() {
  console.log(this);
}
logThis.call("HELLO"); // .call() is a method that every function has. here it allow to set a value for this. s

//point 3: Arrow function do not change the value  of this. Below this will work as if it is outside of a function where it has no object to point to.
const object3 = {
  method: () => {
    console.log(this); // this here keeps the value outdide of the arrow function.,will reslt to undefinedß
  },
};

//this file works with checkout.js
