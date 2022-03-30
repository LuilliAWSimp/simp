const { check, validationResult } = require("express-validator");

const generateClienteValidators = () => [
  check("nombre").notEmpty().isLength({ max: 50 }).withMessage("Invalid name"),
  check("apellido_paterno")
    .notEmpty()
    .isLength({ max: 50 })
    .withMessage("Invalid lastname"),
];

const generateIdValidator = () => [
  check("id").notEmpty().isNumeric().withMessage("Invalid id"),
];

const generateUpdateValidator = () => [
  check("id").notEmpty().isNumeric().withMessage("Invalid id"),
  check("nombre").isLength({ max: 50 }).withMessage("Invalid name"),
  check("apellido_paterno")
    .isLength({ max: 50 })
    .withMessage("Invalid lastname"),
  check("phone")
    .optional()
    .isLength({ min: 10, max: 10 })
    .isNumeric()
    .withMessage("Invalid phone"),
  check("apellido_materno")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Invalid lastname"),
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
  add: [generateClienteValidators(), reporter],
  id: [generateIdValidator(), reporter],
  update: [generateUpdateValidator(), reporter],
};
