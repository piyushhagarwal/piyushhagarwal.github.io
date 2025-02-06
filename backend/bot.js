const puppeteer = require("puppeteer");
const axios = require("axios");

const URL = "http://localhost:8080"; // Adjust if needed

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("http://localhost:5500/index.html"); // Adjust to your HTML file location

  // Fill form inputs with bot-like behavior
  await page.type("#cardNumber", "4111111111111111");
  await page.type("#expiryDate", "12/25");
  await page.type("#cvv", "123");

  // Click the Pay Now button
  await page.click("#payButton");

  // Wait for the reCAPTCHA token to be generated
  setTimeout(async () => {
    await browser.close();
  }, 5000); // Adjust the delay based on reCAPTCHA token generation time

  console.log("Pay Now button clicked");
})();
