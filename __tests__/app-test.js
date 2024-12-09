import { pricingRules } from "../src/data/pricingRules.js";
import { productCatalogue } from "../src/data/productCatalogue.js";
// const { pricingRules } = require("../src/data/pricingRules.js");
// const { productCatalogue } = require("../src/data/productCatalogue.js");

describe("Pricing Rules", () => {
  test("Scenario 1: 3 x Unlimited 1GB, 1 x Unlimited 5GB", () => {
    const cartItems = [
      {
        code: "ult_small",
        name: "Unlimited 1GB",
        price: productCatalogue.ult_small.price,
      },
      {
        code: "ult_small",
        name: "Unlimited 1GB",
        price: productCatalogue.ult_small.price,
      },
      {
        code: "ult_small",
        name: "Unlimited 1GB",
        price: productCatalogue.ult_small.price,
      },
      {
        code: "ult_large",
        name: "Unlimited 5GB",
        price: productCatalogue.ult_large.price,
      },
    ];
    const result = pricingRules.calculatePrice(cartItems, null);

    expect(result.total).toBe("94.70");
    expect(result.items).toHaveLength(4);
  });

  test("Scenario 2: 2 x Unlimited 1GB, 4 x Unlimited 5GB", () => {
    const cartItems = [
      {
        code: "ult_small",
        name: "Unlimited 1GB",
        price: productCatalogue.ult_small.price,
      },
      {
        code: "ult_small",
        name: "Unlimited 1GB",
        price: productCatalogue.ult_small.price,
      },
      {
        code: "ult_large",
        name: "Unlimited 5GB",
        price: productCatalogue.ult_large.price,
      },
      {
        code: "ult_large",
        name: "Unlimited 5GB",
        price: productCatalogue.ult_large.price,
      },
      {
        code: "ult_large",
        name: "Unlimited 5GB",
        price: productCatalogue.ult_large.price,
      },
      {
        code: "ult_large",
        name: "Unlimited 5GB",
        price: productCatalogue.ult_large.price,
      },
    ];
    const result = pricingRules.calculatePrice(cartItems, null);

    expect(result.total).toBe("209.40");
    expect(result.items).toHaveLength(6);
  });

  test("Scenario 3: 1 x Unlimited 1GB, 2 x Unlimited 2GB", () => {
    const cartItems = [
      {
        code: "ult_small",
        name: "Unlimited 1GB",
        price: productCatalogue.ult_small.price,
      },
      {
        code: "ult_medium",
        name: "Unlimited 2GB",
        price: productCatalogue.ult_medium.price,
      },
      {
        code: "ult_medium",
        name: "Unlimited 2GB",
        price: productCatalogue.ult_medium.price,
      },
    ];
    const result = pricingRules.calculatePrice(cartItems, null);

    expect(result.total).toBe("84.70");
    expect(result.items).toContainEqual({
      code: "1gb",
      name: "1GB Data-pack",
      price: 0,
    });
    expect(result.items).toHaveLength(5);
  });

  test("Scenario 4: 1 x Unlimited 1GB, 1 x 1GB Data-pack, with promo code", () => {
    const cartItems = [
      {
        code: "ult_small",
        name: "Unlimited 1GB",
        price: productCatalogue.ult_small.price,
      },
      {
        code: "1gb",
        name: "1GB Data-pack",
        price: productCatalogue["1gb"].price,
      },
    ];
    const result = pricingRules.calculatePrice(cartItems, "I<3AMAYSIM");

    expect(result.total).toBe("31.32");
    expect(result.items).toHaveLength(2);
  });
});
