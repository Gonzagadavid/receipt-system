export const paginationResult = ({ data, total, pageSize, page }) => {
  const pageInfo = {
    pageSize: +pageSize,
    page: +page,
    total,
    next: +pageSize * +page < total,
    prev: page > 1,
  };

  return { data, pageInfo };
};
