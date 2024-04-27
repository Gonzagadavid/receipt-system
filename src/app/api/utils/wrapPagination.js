export const wrapPagination = (callback) => async () => {
  const { data, total, pagination } = await callback();
  const [pageSize, page] = pagination;
  const pageInfo = {
    pageSize,
    page,
    total,
    next: +pageSize * +page < total,
    prev: page > 1,
  };

  return { data, pageInfo };
};
