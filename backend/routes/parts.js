const express = require("express");
const router = express.Router();
const axios = require("axios");
const { getData, setData } = require("../utils/dataStore"); // shared memory

// GET /parts — display from memory only (NO reset)
router.get("/", (req, res) => {
  res.render("parts", {
    title: "Cparts - Parts",
    heading: "Current parts",
    parts: getData(),
    session: req.session,
  });
});

router.get("/json", (req, res) => {
  res.json({
    title: "Cparts-Parts",
    heading: "Current parts",
    parts: getData(),
    session: req.session,
  });
});

// GET /parts/refresh — re-fetch from API manually
router.get("/refresh", async (req, res) => {
  try {
    const apiData = await getAPI();
    setData(apiData.data); // overwrite global object ONLY on refresh
    res.redirect("/parts");
  } catch (err) {
    console.error("Refresh failed:", err);
    res.status(500).send("Failed to refresh parts.");
  }
});

// Only used by /refresh or initial load
async function getAPI() {
  const url = "http://backend.restapi.co.za/items/cparts";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching from API:", error);
    throw error;
  }
}

// INITIALIZE DATA ON APP START
getAPI()
  .then((apiData) => setData(apiData.data))
  .catch((err) => console.error("Failed to load initial data:", err));

module.exports = router;
