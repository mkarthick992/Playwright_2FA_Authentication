import { TOTP } from "otpauth";

const { test, expect } = require("@playwright/test");

test("Login to application with two factor authentication through microsoft azure directory", async ({
  page,
}) => {
  //Navigating to application login page
  await page.goto("");
  const pageTitle = page.title;
  console.log("Page title is:" + pageTitle);

  //Generating Two factor authentication token using secret ID
  let totp = new TOTP({
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: "",
  });
  var otp = totp.generate();
  console.log("Generated OTP is: " + otp);

  //Login to the application with user details and OTP token generated above
  //Enter Microsoft Account UserName
  await page.fill("#i0116", "");
  await page.click("input[type='submit']");

  //Enter the password
  await page.fill("#i0118", "");
  await page.click("input[type='submit']");
  await page.click("#signInAnotherWay");
  await page.click(
    "div.tile:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
  );

  //Enter the above generated OTP using secret key
  await page.fill("#idTxtBx_SAOTCC_OTC", otp);
  await page.click("#idSubmit_SAOTCC_Continue");
  await page.click("#idSIButton9");
});
