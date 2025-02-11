const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set to true for headless execution
  const page = await browser.newPage();

  // First Page - Account Number
  await page.goto("https://example.com/account"); // Replace with actual URL
  await page.type("#accountNumber", "123456789"); // Adjust selector accordingly
  await page.waitForTimeout(5000); // Wait for 5 seconds
  await page.click("#nextButton"); // Adjust selector accordingly
  await page.waitForNavigation();

  // Second Page - Card Details
  await page.goto("https://example.com/card"); // Replace with actual URL
  await page.type("#cardNumber", "4111111111111111"); // Replace with actual selector
  await page.type("#expiryDate", "12/25");
  await page.type("#cvv", "123");
  await page.waitForTimeout(5000); // Wait for 5 seconds
  await page.click("#nextButton");
  await page.waitForNavigation();

  // Third Page - Address Details
  await page.goto("https://example.com/address"); // Replace with actual URL
  await page.type("#fullName", "John Doe");
  await page.type("#address", "123 Main Street, NY");
  await page.type("#zipcode", "10001");
  await page.waitForTimeout(5000); // Wait for 5 seconds
  await page.click("#nextButton");
  await page.waitForNavigation();

  // Fourth Page - Confirm Payment
  await page.goto("https://example.com/confirm"); // Replace with actual URL
  await page.waitForTimeout(5000); // Wait for 5 seconds
  await page.click("#payButton"); // Adjust selector accordingly
  await page.waitForNavigation();

  console.log("Payment Process Completed!");
  await browser.close();
})();
