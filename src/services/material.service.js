const { Op } = require("sequelize");
const { CommonUitls } = require("../utils");

class MaterialService {
  constructor(materialModel) {
    this.materialModel = materialModel;
  }

  createMaterial = async (materialObj) => {
    return await this.materialModel.create(materialObj);
  };

  getMaterialById = async (materialId) => {
    return await this.materialModel.findByPk(materialId);
  };

  getMaterialList = async (search, pageSize, currentPage) => {
    let condition = {};
    if (search) {
      condition.where = {
        name: {
          [Op.like]: `%${search}%`,
        },
      };
    }
    return CommonUitls.getPagination(
      this.materialModel,
      pageSize,
      currentPage,
      condition
    );
  };

  getIsNameExist = async (name) => {
    return await this.materialModel.findOne({ where: { name: name } });
  };
}

module.exports = MaterialService;
