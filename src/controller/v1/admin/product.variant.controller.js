const { ProductVariantService } = require("../../../services");
const { success } = require("../../../response");
const { db } = require("../../../models");
const { ImageUtils } = require("../../../utils");

class ProductVariantController {
  constructor() {
    this.productVariantService = new ProductVariantService(
      db.ProductVariant,
      db.ProductImage
    );
  }

  createVariant = async (req) => {
    const {
      productId,
      colorId,
      storageId,
      matrialId,
      sizeConnectivitiesId,
      price,
      quantity,
    } = req.body;

    const files = req.files;

    const perparedObj = {
      product_fk: productId,
      color_fk: colorId,
      storage_fk: storageId,
      price: price,
      quantity: quantity,
    };
    matrialId ? perparedObj.matrial_fk : matrialId;
    sizeConnectivitiesId
      ? perparedObj.size_connectivities_fk
      : sizeConnectivitiesId;

    const productVariantDetails =
      await this.productVariantService.createProductVariant(perparedObj);

    await Promise.all(
      files.map((photo) => {
        const imageName = `${Date.now()}.png`;
        ImageUtils.createImage("productImage", photo.buffer, imageName);
        this.productVariantService.createProductImage({
          product_variant_fk: productVariantDetails.id,
          image: imageName,
        });
      })
    );

    return success("Product variant add successfully");
  };
}

module.exports = ProductVariantController;
