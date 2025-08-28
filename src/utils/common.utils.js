module.exports = {
  getPagination: async (model, currentPage, pageSize, options = {}) => {
    currentPage = currentPage ? Number(currentPage) : 1;
    pageSize = pageSize ? Number(pageSize) : 10;

    const offset = (currentPage - 1) * pageSize;

    options.limit = pageSize;
    options.offset = offset;

    console.log(options);
    const row = await model.findAll(options);
    const totalCount = await model.count(options);
    const totalPage = Math.ceil(totalCount / pageSize);
    const hasPervious = currentPage > 1;
    const hasNextPage = totalPage > currentPage;

    return {
      currentPage,
      pageSize,
      totalPage,
      totalCount,
      hasNextPage,
      hasPervious,
      row,
    };
  },
};
