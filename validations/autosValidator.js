const { check, validationResult } = require("express-validator");

const generateAutosValidators = () => [
  check("marca")
    .notEmpty()
    .isLength({ max: 150 })
    .withMessage("Marca invalida"),
  check("serie").notEmpty().isLength({ max: 50 }).withMessage("Serie invalida"),
];

const generateIdValidator = () => [
  check("id").notEmpty().isNumeric().withMessage("Invalid id"),
];

const generateUpdateValidator = () => [
  check("id").notEmpty().isNumeric().withMessage("Invalid id"),
  check("marca")
    .notEmpty()
    .isLength({ max: 150 })
    .withMessage("Marca invalida"),
  check("serie").notEmpty().isLength({ max: 50 }).withMessage("Serie invalida"),
  check("modelo")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Esa marca no existe we"),
  check("color")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Ese color que krnal"),
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
  add: [generateAutosValidators(), reporter],
  id: [generateIdValidator(), reporter],
  update: [generateUpdateValidator(), reporter],
};
