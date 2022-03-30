const express = require("express");
const router = express.Router();
const rentasController = require("../controllers/rentasControllers");
const rentasValidator = require("../validations/rentasValidator");
const jwtToken = require("../validations/jwtValidator");

router.get(
  "/renta",
  jwtToken.validateToken,
  rentasValidator.id,
  rentasController.getRenta
);
router.get("/rentas", rentasController.getRentas);
router.get(
  "/rentus",
  jwtToken.validateToken,
  rentasValidator.idU,
  rentasController.getRentus
);
router.post("/renta",jwtToken.validateToken,rentasValidator.add,rentasController.postRenta);
router.put("/renta",jwtToken.validateToken,rentasValidator.update,rentasController.putRenta);
router.delete("/renta",jwtToken.validateToken,rentasValidator.id,rentasController.deleteRenta);
module.exports = router;
