const { db } = require("../../../models");
const { success, notFound } = require("../../../response");
const { ConnectivityService } = require("../../../services");

class ColorController {
  constructor() {
    this.sizeConnectivityService = new ConnectivityService(db.SizeConnectivity);
  }

  addSizeConnectivity = async (req) => {
    const { size, connectivity } = req.body;
    await this.sizeConnectivityService.createConnectivity({
      size: size,
      connectivity: connectivity,
    });
    return success("Size and Connectivity add successfully");
  };

  editSizeConnectivity = async (req) => {
    const { sizeConnectivityId, size, connectivity } = req.body;

    const isExist = await this.sizeConnectivityService.getConnectivityById(
      sizeConnectivityId
    );

    if (!isExist) {
      return notFound("Could not matching recored found");
    }

    isExist.size = size;
    isExist.connectivity = connectivity;
    isExist.save();

    return success("Edit Size and Connectivity successfully");
  };

  getSizeConnectivityById = async (req) => {
    const { sizeConnectivityId } = req.query;
    const isExist = await this.sizeConnectivityService.getConnectivityById(
      sizeConnectivityId
    );

    if (!isExist) {
      return notFound("Could not matching recored found");
    }
    return success("Get Size and Connectivity details successfull", isExist);
  };

  deleteSizeConnectivity= async (req) => {
    const { sizeConnectivityId } = req.params;
    const isExist = await this.sizeConnectivityService.getConnectivityById(
      sizeConnectivityId
    );
    if (!isExist) {
      return notFound("Could not matching recored found");
    }

    isExist.destroy();
    return success("Delete Size and Connectivity details successfull", isExist);
  };

  getSizeConnectivityList = async (req) => {
    const { search, currentPage, pageSize } = req.query;
    const results = await this.sizeConnectivityService.getConnectivityList(
      search,
      currentPage,
      pageSize
    );
    return success("Get Size and Connectivity list successfully", results);
  };
}

module.exports = ColorController;
