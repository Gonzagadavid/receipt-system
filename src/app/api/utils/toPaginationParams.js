export const toPaginationParams = (url) =>
  [...new URL(url).searchParams.entries()].reduce(
    (paginationParams, [key, value]) => ({ ...paginationParams, [key]: value }),
    {},
  );
