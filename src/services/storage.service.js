const { CommonUitls } = require("../utils");

class StorageService {
  constructor(storageModel) {
    this.storageModel = storageModel;
  }

  createStorage = async (colorObj) => {
    return await this.storageModel.create(colorObj);
  };

  getStorageById = async (colorId) => {
    return await this.storageModel.findByPk(colorId);
  };

  getStorageList = async (search, pageSize, currentPage) => {
    let condition = {};
    if (search) {
      condition.where = {
        name: {
          [Op.like]: `%${search}%`,
        },
      };
    }

    return CommonUitls.getPagination(
      this.storageModel,
      pageSize,
      currentPage,
      condition
    );
  };
}

module.exports = StorageService;
