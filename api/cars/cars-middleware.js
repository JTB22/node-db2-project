const Car = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  const car = await Car.getById(id);
  if (!car) {
    next({ status: 404, message: `car with id ${id} is not found` });
  } else {
    req.car = car;
    next();
  }
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    next({ status: 400, message: `vin is missing` });
  } else if (!make) {
    next({ status: 400, message: `make is missing` });
  } else if (!model) {
    next({ status: 400, message: `model is missing` });
  } else if (!mileage) {
    next({ status: 400, message: `mileage is missing` });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  const isValidVin = vinValidator.validate(vin);
  if (!isValidVin) {
    next({ status: 400, message: `vin ${vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  Car.getByVin(vin).then((car) => {
    if (car) {
      next({ status: 400, message: `vin ${vin} already exists` });
    } else {
      next();
    }
  });
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
