const { db } = require("../../../models");
const { success, notFound, badRequest } = require("../../../response");
const { CategoryService } = require("../../../services");

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService(db.Category);
  }

  addNewCategory = async (req) => {
    const { name, type = "repair-option" } = req.body;

    const isNameExist = await this.categoryService.getIsNameExist(name);

    if (isNameExist) {
      return badRequest("Already exist this name");
    }

    const perparedObj = {
      name: name,
      type: type ? type : "sell-option",
    };
    const categoryDetails = await this.categoryService.createCategory(
      perparedObj
    );

    return success("Add new category successfully", categoryDetails);
  };

  editCategory = async (req) => {
    const { categoryId, name, type = "repair-option" } = req.body;

    const isExist = await this.categoryService.getCategoryById(categoryId);

    if (!isExist) {
      return notFound("Could not matching record found");
    }

    isExist.name = name ? name : "";
    isExist.type = type ? type : "";
    isExist.save();

    return success("Edit category successfully");
  };

  deleteCategory = async (req) => {
    const { categoryId } = req.params;

    console.log({ categoryId });
    const isExist = await this.categoryService.getCategoryById(categoryId);

    if (!isExist) {
      return notFound("Could not matching record found");
    }
    await isExist.destroy();
    return success("Delete category successfully");
  };

  getCategory = async (req) => {
    const { categoryId } = req.query;

    const categoryDetails = await this.categoryService.getCategoryById(
      categoryId
    );

    if (!categoryDetails) {
      return notFound("Could not matching record found");
    }
    return success("Get category successfully", categoryDetails);
  };

  getCategoryList = async (req) => {
    const { currentPage, pageSize, search } = req.query;

    const categoryList = await this.categoryService.getCategoryList(
      search,
      currentPage,
      pageSize
    );

    if (!categoryList) {
      return notFound("Could not matching record found");
    }
    return success("Get category successfully", categoryList);
  };
}

module.exports = CategoryController;
