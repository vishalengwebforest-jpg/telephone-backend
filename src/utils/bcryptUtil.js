const bcrypt = require("bcrypt");

module.exports = {
  hashPassword: async (data) => {
    return await bcrypt.hash(data, 10);
  },
  comparePassword: async (textPassword, hashPassword) => {
    return await bcrypt.compare(textPassword, hashPassword);
  },
};
