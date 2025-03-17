const prisma = require("../configs/prisma");
const createError = require("../utils/createError");

const locationController = {};

locationController.getProvince = async (req, res, next) => {
  try {
    // Create the new place
    const province = await prisma.province.findMany({});

    // Send response
    res.json({
        province,
    });
  } catch (error) {
    next(error);
  }
};

locationController.getDistrict = async (req, res, next) => {
    try {
        const { provinceId } = req.query; // หรือ req.params ถ้าใช้ path parameter
        console.log("***", provinceId)
        if (!provinceId) {
          return createError(400, "provinceId is required")
        }
    
        const districts = await prisma.district.findMany({
          where: {
            provinceId: Number(provinceId),
          },
        });
    
        res.json({ districts });
      } catch (error) {
        next(error);
      }
    };

module.exports = locationController;
