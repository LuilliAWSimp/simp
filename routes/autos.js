const express = require("express");
const router = express.Router();
const autosController = require("../controllers/autosController");
const autosValidator = require("../validations/autosValidator");
const jwtToken = require("../validations/jwtValidator");

router.get(
  "/auto",
  jwtToken.validateToken,
  autosValidator.id,
  autosController.getAuto
);
router.get("/autos", jwtToken.validateToken, autosController.getAutos);
router.post(
  "/auto",
  jwtToken.validateToken,
  autosValidator.add,
  autosController.postAutos
);
router.delete(
  "/auto",
  jwtToken.validateToken,
  autosValidator.id,
  autosController.deleteAutos
);
router.put(
  "/auto",
  jwtToken.validateToken,
  autosValidator.id,
  autosController.PutAutos
);

module.exports = router;
