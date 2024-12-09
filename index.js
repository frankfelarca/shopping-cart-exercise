import { ShoppingCart } from "./src/data/shoppingCart.js";
import { pricingRules } from "./src/data/pricingRules.js";

// Initialize shopping cart
const cart = ShoppingCart().new(pricingRules);

// add items to cart
cart.add("ult_small");
cart.add("ult_small");
cart.add("ult_small");
cart.add("ult_large");

cart.total(); // display cart total
cart.items(); // display cart items
cart.clear(); // clear cart items
