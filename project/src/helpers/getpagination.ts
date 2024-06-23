import { Request } from "express";

export interface PaginationMetaData {
  page: number;
  pages: number;
  total: number;
  limit: number;
}

export function getPagination(req: Request) {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  if (page === 0 || limit === 0) {
    return {
      page: undefined,
      limit: undefined,
      offset: undefined,
    };
  }

  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
  };
}

export function getPaginationMetaData(
  count: number,
  page: number,
  limit: number,
): PaginationMetaData {
  const pages = Math.ceil(count / limit);

  return {
    page,
    pages,
    total: count,
    limit,
  };
}
