var express = require("express");
var router = express.Router();
//get global object and its crud functions
const { getData, addPart, updatePart } = require("../utils/dataStore");

//authentification middleware
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated() || req.session.user) {
    return next();
  }
  res.redirect("/login");
}

//router for get part
//protected route
router.get("/", isAuthenticated, (req, res) => {
  res.render("part", { title: "Add Part", heading: "Part" });
});

//protected route 
router.get("/edit", isAuthenticated, (req, res) => {
  res.render("part_edit", { title: "Edit part", heading: "Edit the part" });
});

//add new product
//proctected
router.post("/add",isAuthenticated, (req, res) => {
  const { product, description, image, type, qty_instock, price } = req.body;

  // Validate presence
  if (
    !product ||
    !description ||
    !image ||
    !type ||
    qty_instock == null ||
    price == null
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Convert & validate
  const qty = parseInt(qty_instock);
  const cost = parseFloat(price);

  if (isNaN(qty) || isNaN(cost)) {
    return res
      .status(400)
      .json({ error: "Quantity and price must be numeric." });
  }

  const parts = getData();

  // Check duplicate by product
  const duplicate = parts.find((p) => p.product === product);
  if (duplicate) {
    return res.status(400).json({ error: "Part already exists." });
  }

  // Create new part object
  const newPart = {
    id: parts.length ? Math.max(...parts.map((p) => p.id)) + 1 : 1,
    product,
    description,
    image,
    type,
    qty_instock: qty,
    price: cost,
  };

  addPart(newPart);
  return res
    .status(200)
    .json({ message: "Part added successfully.", part: newPart });
});

//edit part (update)
//protected
router.post("/edit",isAuthenticated, (req, res) => {
  const { id, product, description, image, type, qty_instock, price } =
    req.body;

  if (
    !id ||
    !product ||
    !description ||
    !image ||
    !type ||
    qty_instock == null ||
    price == null
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const qty = parseInt(qty_instock);
  const cost = parseFloat(price);
  const partId = parseInt(id);

  if (isNaN(qty) || isNaN(cost) || isNaN(partId)) {
    return res
      .status(400)
      .json({ error: "ID, quantity, and price must be numeric." });
  }

  const parts = getData();
  const partExists = parts.find((p) => p.id === partId);

  if (!partExists) {
    return res.status(404).json({ error: "Part not found." });
  }

  const updatedPart = {
    id: partId,
    product,
    description,
    image,
    type,
    qty_instock: qty,
    price: cost,
  };

  updatePart(updatedPart);
  return res
    .status(200)
    .json({ message: "Part updated successfully.", part: updatedPart });
});

//in order to get id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const part = getData().find((p) => p.id === id);
  if (!part) return res.status(404).json({ error: "Part not found." });
  res.json(part);
});

module.exports = router;
