const { db } = require("../../../models");
const { success, notFound, badRequest } = require("../../../response");
const { MaterialService } = require("../../../services");

class MaterialController {
  constructor() {
    this.materialService = new MaterialService(db.Material);
  }

  addMaterial = async (req) => {
    const { materialName } = req.body;

    const isExistName = await this.materialService.getIsNameExist(materialName);

    if (isExistName) {
      return badRequest("Already add this matrial");
    }

    await this.materialService.createMaterial({ name: materialName });
    return success("Material add successfully");
  };

  editMaterial = async (req) => {
    const { materialId, materialName } = req.body;

    const isExist = await this.materialService.getMaterialById(materialId);

    if (!isExist) {
      return notFound("Could not matching recored found");
    }

    isExist.name = materialName;
    isExist.save();

    return success("Edit material successfully");
  };

  getMaterialById = async (req) => {
    const { materialId } = req.query;
    const isExist = await this.materialService.getMaterialById(materialId);

    if (!isExist) {
      return notFound("Could not matching recored found");
    }
    return success("Get material details successfull", isExist);
  };

  deleteMaterial = async (req) => {
    const { materialId } = req.params;
    const isExist = await this.materialService.getMaterialById(materialId);
    if (!isExist) {
      return notFound("Could not matching recored found");
    }

    isExist.destroy();
    return success("Delete material details successfull", isExist);
  };

  getMaterialList = async (req) => {
    const { search, currentPage, pageSize } = req.query;
    const results = await this.materialService.getMaterialList(
      search,
      currentPage,
      pageSize
    );
    return success("Get material list successfully", results);
  };
}

module.exports = MaterialController;
