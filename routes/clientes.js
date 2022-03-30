const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clienteControllers");
const clienteValidator = require("../validations/clienteValidator");
const jwtToken = require("../validations/jwtValidator");

router.post("/login", clienteValidator.id, clientesController.getLogin);
router.get("/cliente",jwtToken.validateToken,clienteValidator.id, clientesController.getCliente);
router.get("/clientes", jwtToken.validateToken, clientesController.getClientes);
router.post("/cliente",jwtToken.validateToken,clienteValidator.add,clientesController.postCliente);
router.put("/cliente",jwtToken.validateToken,clienteValidator.update,clientesController.putCliente);
router.delete("/cliente",jwtToken.validateToken,clienteValidator.id,clientesController.deleteCliente);
module.exports = router;