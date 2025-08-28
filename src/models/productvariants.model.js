"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Color, { foreignKey: "color_fk" });
      this.belongsTo(models.Storage, { foreignKey: "storage_fk" });
      this.belongsTo(models.Material, { foreignKey: "matrial_fk" });
      this.belongsTo(models.SizeConnectivity, {
        foreignKey: "size_connectivities_fk",
      });
      this.hasMany(models.ProductImage, { foreignKey: "product_variant_fk" });
    }
  }
  ProductVariant.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },

      product_fk: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      color_fk: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "colors",
          key: "id",
        },
      },
      storage_fk: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "storages",
          key: "id",
        },
      },
      matrial_fk: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "storages",
          key: "id",
        },
      },
      size_connectivities_fk: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "size_connectivities",
          key: "id",
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      modelName: "ProductVariant",
      tableName: "product_variants",
      timestamps: false,
    }
  );
  return ProductVariant;
};
