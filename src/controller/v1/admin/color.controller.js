const { db } = require("../../../models");
const { success, notFound } = require("../../../response");
const { ColorService } = require("../../../services");

class ColorController {
  constructor() {
    this.colorService = new ColorService(db.Color);
  }

  addColor = async (req) => {
    const { colorName, hexCode } = req.body;
    await this.colorService.createColor({ name: colorName, hex_code: hexCode });
    return success("Color add successfully");
  };

  editColor = async (req) => {
    const { colorId, colorName, hexCode } = req.body;

    const isExist = await this.colorService.getColorById(colorId);

    if (!isExist) {
      return notFound("Could not matching recored found");
    }

    isExist.name = colorName ? colorName : "";
    isExist.hex_code = hexCode ? hexCode : "";
    isExist.save();

    return success("Edit color successfully");
  };

  getColorById = async (req) => {
    const { colorId } = req.query;
    const isExist = await this.colorService.getColorById(colorId);

    if (!isExist) {
      return notFound("Could not matching recored found");
    }
    return success("Get color details successfull", isExist);
  };

  deleteColor = async (req) => {
    const { colorId } = req.params;
    const isExist = await this.colorService.getColorById(colorId);
    if (!isExist) {
      return notFound("Could not matching recored found");
    }

    isExist.destroy();
    return success("Delete color details successfull", isExist);
  };

  getColorList = async (req) => {
    const { search, currentPage, pageSize } = req.query;
    const results = await this.colorService.getColorList(
      search,
      currentPage,
      pageSize
    );
    return success("Get color list successfully", results);
  };
}

module.exports = ColorController;
