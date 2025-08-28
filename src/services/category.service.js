const { Op } = require("sequelize");
const { CommonUitls } = require("../utils");

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  createCategory = async (categoryObj) => {
    return await this.categoryModel.create(categoryObj);
  };

  getCategoryById = async (categoryId) => {
    return await this.categoryModel.findByPk(categoryId);
  };

  getCategoryList = async (search, pageSize, currentPage) => {
    let condition = {
      order: [["created_at", "desc"]],
    };
    if (search) {
      condition.where = {
        name: {
          [Op.like]: `%${search}%`,
        },
      };
    }
    return CommonUitls.getPagination(
      this.categoryModel,
      pageSize,
      currentPage,
      condition
    );
  };

  getIsNameExist = async (name) => {
    return await this.categoryModel.findOne({ where: { name: name } });
  };
}

module.exports = CategoryService;
