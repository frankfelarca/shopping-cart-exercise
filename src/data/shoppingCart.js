import { productCatalogue } from "./productCatalogue.js";

export const ShoppingCart = () => {
  // Cart state
  let cartItems = [];
  let promoCode = null;

  return {
    // Initializes the cart.
    new: (pricingRules) => {
      return {
        // Add items to the cart.
        add: (itemCode, code = null) => {
          const product = productCatalogue[itemCode];
          if (!product) {
            throw new Error(`Item ${itemCode} not found in catalog.`);
          }

          cartItems.push({ code: itemCode, ...product });
          if (code) {
            promoCode = code;
          }
        },

        // Returns the total price of the cart.
        total: () => {
          const { total } = pricingRules.calculatePrice(cartItems, promoCode);
          console.log("Total: ", total);
          return parseFloat(total);
        },

        // Returns the list of items in the cart.
        items: () => {
          const { items } = pricingRules.calculatePrice(cartItems, promoCode);
          console.log("Items: ", items);
          console.log("\n");
          return items;
        },

        // Clear the items in the cart.
        clear: () => {
          cartItems = [];
          promoCode = null;
        },
      };
    },
  };
};
