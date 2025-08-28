const { CommonUitls } = require("../utils");

class ProductService {
  constructor(
    productModel,
    productVariantModel,
    colorModel,
    storageModel,
    materialModel,
    sizeConnectivityModel,
    productImageModel
  ) {
    this.productModel = productModel;
    this.productVariantModel = productVariantModel;
    this.colorModel = colorModel;
    this.storageModel = storageModel;
    this.materialModel = materialModel;
    this.sizeConnectivityModel = sizeConnectivityModel;
    this.productImageModel = productImageModel;
  }

  addProduct = async (productObj) => {
    return await this.productModel.create(productObj);
  };

  getProductById = async (productId) => {
    return await this.productModel.findOne({
      where: {
        id: productId,
      },
      include: {
        model: this.productVariantModel,
        include: [
          {
            model: this.colorModel,
          },
          {
            model: this.storageModel,
          },
          {
            model: this.materialModel,
          },
          {
            model: this.sizeConnectivityModel,
          },
          {
            model: this.productImageModel,
          },
        ],
      },
    });
  };

  getProductList = async (search, currentPage, pageSize) => {
    let condition = {};
    if (search) {
      condition.where = {
        name: {
          [Op.like]: `%${search}%`,
        },
      };
    }

    return CommonUitls.getPagination(
      this.productModel,
      pageSize,
      currentPage,
      condition
    );
  };
}

module.exports = ProductService;
