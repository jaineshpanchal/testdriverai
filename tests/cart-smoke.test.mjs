import { TestDriver } from "testdriverai/vitest/hooks";
import { describe, expect, it } from "vitest";

describe("Sandbox cart smoke test", () => {
  it("logs in and adds an item to the cart", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({
      url: "http://testdriver-sandbox.vercel.app/login",
    });

    const password = await testdriver.extract("the password");

    const usernameField = await testdriver.find("username input");
    await usernameField.click();
    await testdriver.type("standard_user");

    await testdriver.pressKeys(["tab"]);
    await testdriver.type(password, { secret: true });

    await testdriver.find("submit button on the login form").click();

    const addToCartButton = await testdriver.find(
      "add to cart button under TestDriver Hat",
    );
    await addToCartButton.click();

    const cartButton = await testdriver.find(
      "cart button in the top right corner",
    );
    await cartButton.click();

    const result = await testdriver.assert("There is an item in the cart");
    expect(result).toBeTruthy();
  });
});
