const { db } = require("../../../models");
const { success, notFound } = require("../../../response");
const { StorageService } = require("../../../services");

class StorageController {
  constructor() {
    this.storageService = new StorageService(db.Storage);
  }

  addStorage = async (req) => {
    const { size } = req.body;
    await this.storageService.createStorage({ size_in_gb: size });
    return success("Storage add successfully");
  };

  editStorage = async (req) => {
    const { storageId, size } = req.body;

    const isExist = await this.storageService.getStorageById(storageId);

    if (!isExist) {
      return notFound("Could not matching recored found");
    }

    isExist.size_in_gb = size;
    isExist.save();

    return success("Edit Storage successfully");
  };

  getStorageById = async (req) => {
    const { storageId } = req.query;
    const isExist = await this.storageService.getStorageById(storageId);

    if (!isExist) {
      return notFound("Could not matching recored found");
    }
    return success("Get Storage details successfull", isExist);
  };

  deleteStorage = async (req) => {
    const { storageId } = req.params;
    const isExist = await this.storageService.getStorageById(storageId);
    if (!isExist) {
      return notFound("Could not matching recored found");
    }

    isExist.destroy();
    return success("Delete Storage details successfull", isExist);
  };

  getStorageList = async (req) => {
    const { search, currentPage, pageSize } = req.query;
    const results = await this.storageService.getStorageList(
      search,
      currentPage,
      pageSize
    );
    return success("Get Storage list successfully", results);
  };
}

module.exports = StorageController;
