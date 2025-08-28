"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SizeConnectivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SizeConnectivity.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
      },
      size: {
        type: DataTypes.STRING(255),
        allowNulll: false,
      },
      connectivity: {
        type: DataTypes.STRING(255),
        allowNulll: false,
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
      modelName: "SizeConnectivity",
      tableName: "size_connectivities",
      timestamps: false,
    }
  );
  return SizeConnectivity;
};
