class ProductVariantService {
  constructor(productVariantModel, productImageModel) {
    this.productVariantModel = productVariantModel;
    this.productImageModel = productImageModel;
  }

  createProductVariant = async (productVariantObj) => {
    return await this.productVariantModel.create(productVariantObj);
  };

  createProductImage = async (productImageObj) => {
    return await this.productImageModel.create(productImageObj);
  };
}

module.exports = ProductVariantService;
