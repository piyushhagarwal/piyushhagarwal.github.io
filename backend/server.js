const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const RECAPTCHA_SITE_KEY_1 = "6LcrsM4qAAAAAHufQgaJwA5ItJwK0BIJCy51j7n4";
const RECAPTCHA_SITE_KEY_2 = "6LfZgs8qAAAAAK95bsGHGqlajmgNrynqGUurTHBH";

const API_KEY_1 = "AIzaSyAJRhHfTCY_jRmjXYA-2qRx6G9CZ87vA9E";
const API_KEY_2 = "AIzaSyBx5XfTCszXlp51bjGGzrQqwwfRMNZ34wM";

const PROJECT_ID_1 = "clean-sunspot-377913";
const PROJECT_ID_2 = "recaptcha-v3-450206";

app.post("/api/payment", async (req, res) => {
  const { cardNumber, expiryDate, cvv, recaptchaToken } = req.body;

  if (!recaptchaToken) {
    console.log("reCAPTCHA token missing");
    return res.status(400).json({ message: "reCAPTCHA token missing" });
  }

  try {
    // Verify reCAPTCHA token with Google
    const response = await axios.post(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_ID_1}/assessments?key=${API_KEY_1}`,
      {
        event: {
          token: recaptchaToken,
          siteKey: RECAPTCHA_SITE_KEY_1,
          expectedAction: "purchase",
          userIpAddress: req.ip,
          userAgent: req.get("User-Agent"),
        },
      }
    );

    // const { success, score } = response.data;

    console.log("data", response.data);

    // if (!success || score < 0.5) {
    //   return res.status(400).json({ message: "reCAPTCHA verification failed" });
    // }

    // Proceed with payment processing (dummy response)
    res
      .status(200)
      .json({ message: "Payment processed successfully", data: response.data });
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
