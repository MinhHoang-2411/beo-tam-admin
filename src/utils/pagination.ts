import { Pagination } from "../types/pagination";

export const totalPagePagination = (pagination: Pagination) => {
  const totalPage = Math.ceil(pagination.totalItems / pagination.limit);
  if (isNaN(totalPage)) return 0;
  return Number(totalPage ?? 0);
};
