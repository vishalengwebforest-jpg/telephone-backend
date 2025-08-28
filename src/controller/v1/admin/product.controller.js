const { db } = require("../../../models");
const { success, notFound } = require("../../../response");
const { ProductService } = require("../../../services");
class ProductController {
  constructor() {
    this.productService = new ProductService(
      db.Product,
      db.ProductVariant,
      db.Color,
      db.Storage,
      db.Material,
      db.SizeConnectivity,
      db.ProductImage
    );
  }

  addProduct = async (req) => {
    const { name, description, categoryId } = req.body;

    const preperedObj = {
      name: name,
      description: description,
      category_fk: categoryId,
    };
    const product = await this.productService.addProduct(preperedObj);

    return success("Add product succesfully", product);
  };

  editProduct = async (req) => {
    const { productId, name, description, categoryId } = req.body;

    const isExist = await this.productService.getProductById(productId);

    if (!isExist) {
      return notFound("Could not matching recored found");
    }

    isExist.name = name ? name : "";
    isExist.description = description ? description : "";
    isExist.category_fk = categoryId ? categoryId : "";
    isExist.save();

    return success("Product edit succesfully");
  };

  deleteProduct = async (req) => {
    const { productId } = req.params;

    const isExist = await this.productService.getProductById(productId);

    if (!isExist) {
      return notFound("Could not matching recored found");
    }

    isExist.destroy();

    return success("Delete product succesfully");
  };

  getProductById = async (req) => {
    const { productId } = req.query;

    const isExist = await this.productService.getProductById(productId);

    if (!isExist) {
      return notFound("Could not matching recored found");
    }

    return success("Get product details successfully succesfully", isExist);
  };

  getProductList = async (req) => {
    const { search, currentPage, pageSize } = req.query;
    const results = await this.productService.getProductList(
      search,
      currentPage,
      pageSize
    );
    return success("Get Storage list successfully", results);
  };
}

module.exports = ProductController;
