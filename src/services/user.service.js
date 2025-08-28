class UserService {
  constructor(userModel, role, userRole) {
    this.userModel = userModel;
    this.roleModel = role;
    this.userRole = userRole;
  }

  isExistUserEmail = async (email) => {
    return await this.userModel.findOne({
      where: {
        email: email,
      },
      include: {
        model: this.userRole,
        as: "user_role",
        include: {
          model: this.roleModel,
          as: "role_name",
        },
      },
    });
  };
}

module.exports = UserService;
