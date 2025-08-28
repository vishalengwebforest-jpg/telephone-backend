const { CommonUitls } = require("../utils");

class ConnectivityService {
  constructor(connectivityModel) {
    this.connectivityModel = connectivityModel;
  }

  createConnectivity = async (colorObj) => {
    return await this.connectivityModel.create(colorObj);
  };

  getConnectivityById = async (colorId) => {
    return await this.connectivityModel.findByPk(colorId);
  };

  getConnectivityList = async (search, pageSize, currentPage) => {
    let condition = {};
    if (search) {
      condition.where = {
        name: {
          [Op.like]: `%${search}%`,
        },
      };
    }

    return CommonUitls.getPagination(
      this.connectivityModel,
      pageSize,
      currentPage,
      condition
    );
  };
}

module.exports = ConnectivityService;
