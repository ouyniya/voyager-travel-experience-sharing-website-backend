const prisma = require("../configs/prisma");
const createError = require("../utils/createError");

const placeController = {};

placeController.addPlace = async (req, res, next) => {
  try {
    const { name, description, latitude, longitude, provinceId, districtId } =
      req.body;

    // Ensure provinceId and districtId are numbers
    const provinceIdNum = Number(provinceId);
    const districtIdNum = Number(districtId);

    // already validated with Zod

    // Check if the place already exists
    const isPlaceExist = await prisma.place.findFirst({
      where: {
        name,
        provinceId: provinceIdNum,
        districtId: districtIdNum,
      },
    });

    if (isPlaceExist) {
      return next(createError(400, "Place already exists"));
    }

    // Create the new place
    const place = await prisma.place.create({
      data: {
        name,
        description,
        latitude,
        longitude,
        provinceId: provinceIdNum,
        districtId: districtIdNum,
      },
    });

    // Send response
    res.status(201).json({
      message: "Place created successfully",
      place,
    });
  } catch (error) {
    next(error);
  }
};

placeController.updatePlace = async (req, res, next) => {
  try {
    res.json({ message: "updated place" });
  } catch (error) {
    next(error);
  }
};

placeController.deletePlace = async (req, res, next) => {
  try {
    res.json({ message: "deleted place" });
  } catch (error) {
    next(error);
  }
};

placeController.getPlaces = async (req, res, next) => {
  try {
    const places = await prisma.place.findMany();
    res.status(200).json({ places });
  } catch (error) {
    next(error);
  }
};


module.exports = placeController;
