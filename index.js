import { ShoppingCart } from "./src/data/shoppingCart.js";
import { pricingRules } from "./src/data/pricingRules.js";

// Initialize shopping cart
const cart = ShoppingCart().new(pricingRules);

// Scenario 1
cart.add("ult_small");
cart.add("ult_small");
cart.add("ult_small");
cart.add("ult_large");
cart.total(); // display cart total
cart.items(); // display cart items
cart.clear(); // clear cart items

// Scenario 2
cart.add("ult_small");
cart.add("ult_small");
cart.add("ult_large");
cart.add("ult_large");
cart.add("ult_large");
cart.add("ult_large");
cart.total();
cart.items();
cart.clear();

// Scenario 3
cart.add("ult_small");
cart.add("ult_medium");
cart.add("ult_medium");
cart.total();
cart.items();
cart.clear();

// Scenario 4
cart.add("ult_small");
cart.add("1gb", "I<3AMAYSIM");
cart.total();
cart.items();
cart.clear();
