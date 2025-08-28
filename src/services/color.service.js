const { CommonUitls } = require("../utils");

class ColorService {
  constructor(colorModel) {
    this.colorModel = colorModel;
  }

  createColor = async (colorObj) => {
    return await this.colorModel.create(colorObj);
  };

  getColorById = async (colorId) => {
    return await this.colorModel.findByPk(colorId);
  };

  getColorList = async (search, pageSize, currentPage) => {
    let condition = {};
    if (search) {
      condition.where = {
        name: {
          [Op.like]: `%${search}%`,
        },
      };
    }

    return CommonUitls.getPagination(
      this.colorModel,
      pageSize,
      currentPage,
      condition
    );
  };

  getIsNameExist = async (name) => {
    return await this.materialModel.findOne({ where: { name: name } });
  };
}

module.exports = ColorService;
