"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_variants", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      product_fk: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      color_fk: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "colors",
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
      },
      storage_fk: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "storages",
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
      },
      matrial_fk: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "storages",
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
      },
      size_connectivities_fk: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "size_connectivities",
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_variants");
  },
};
