"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.ProductVariant, { foreignKey: "id" });
    }
  }
  ProductImage.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      product_variant_fk: {
        type: DataTypes.UUID,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return (
            process.env[`IMAGE_URL_${process.env.RUN_MODE}`] +
            "/productImage/" +
            this.getDataValue("image")
          );
        },
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
    },
    {
      sequelize,
      tableName: "product_images",
      modelName: "ProductImage",
      timestamps: false,
    }
  );
  return ProductImage;
};
