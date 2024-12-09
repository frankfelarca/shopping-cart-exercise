import { productCatalogue } from "./productCatalogue.js";
import { promoCodes } from "./promoCodes.js";

export const pricingRules = {
  calculatePrice: (cartItems, promoCode) => {
    const updatedItems = [];
    let total = 0;

    // Calculates the total price for each group.
    const calculateGroupTotal = (items, pricePerUnit) => {
      return items.length * pricePerUnit;
    };

    // Group items by product code.
    const groupedItems = cartItems.reduce((acc, item) => {
      acc[item.code] = acc[item.code] || [];
      acc[item.code].push(item);
      return acc;
    }, {});

    // Apply rules for each product
    Object.keys(groupedItems).forEach((code) => {
      const items = groupedItems[code];

      if (code === "ult_small") {
        // Promo 1: 3 for 2 deal on unlimited 1GB sim.
        const eligibleItems = Math.floor(items.length / 3) * 2;
        const remainingItems = items.length % 3;
        total += calculateGroupTotal(
          items.slice(0, eligibleItems + remainingItems),
          productCatalogue[code].price
        );
      } else if (code === "ult_large") {
        // Promo 2: Bulk discount on Unlimited 5GB sims.
        const pricePerUnit =
          items.length > 3 ? 39.9 : productCatalogue[code].price;
        total += calculateGroupTotal(items, pricePerUnit);
      } else if (code === "ult_medium") {
        // Promo 3: Free 1GB data pack for each Unlimited 2GB sim.
        items.forEach(() => {
          updatedItems.push({
            code: "1gb",
            name: "1GB Data-pack",
            price: 0,
          });
        });
        total += calculateGroupTotal(items, productCatalogue[code].price);
      } else {
        // No promo available.
        total += calculateGroupTotal(items, productCatalogue[code].price);
      }

      updatedItems.push(...items);
    });

    // Apply discount for valid promo code.
    promoCodes.every((promo) => {
      if (promo.value === promoCode) {
        total *= promo.discount;
        return;
      }
    });

    return { items: updatedItems, total: total.toFixed(2) };
  },
};
