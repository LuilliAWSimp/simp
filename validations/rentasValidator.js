const { check, validationResult } = require("express-validator");

const generateRentasValidators = () => [
  check("id_cliente").notEmpty().isNumeric().withMessage("Invalid id"),
  check("id_auto").notEmpty().isNumeric().withMessage("Invalid id"),
  check("fecha_renta").notEmpty().isDate().withMessage("Invalid date"),
  check("fecha_entrega").notEmpty().isDate().withMessage("Invalid date"),
];

const generateIdValidator = () => [
  check("id").notEmpty().isNumeric().withMessage("Invalid id"),
];
const generateIdUValidator = () => [
  check("id_cliente").notEmpty().isNumeric().withMessage("Invalid id"),
];

const generateUpdateValidator = () => [
  check("id").notEmpty().isNumeric().withMessage("Invalid id"),
  check("id_cliente").isNumeric().withMessage("Invalid id"),
  check("id_auto").isNumeric().withMessage("Invalid id"),
  check("fecha_renta").isDate().withMessage("Invalid date"),
  check("fecha_entrega").isDate().withMessage("Invalid date"),
];

const reporter = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      succes: false,
      code: 404,
      message: errors,
      data: [],
    });
  }
  next();
};

module.exports = {
  add: [generateRentasValidators(), reporter],
  id: [generateIdValidator(), reporter],
  idU: [generateIdUValidator(), reporter],
  update: [generateUpdateValidator(), reporter],
};
