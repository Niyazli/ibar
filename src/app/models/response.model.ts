export class ResponseModel<R> {
  result: R;
  _meta: Pagination;
}

export interface Pagination {
  code: number;
  currentPage: number;
  message: string;
  pageCount: number;
  perPage: number;
  rateLimit: Rate;
  limit: number;
  remaining: number;
  reset: number;
  success: boolean;
  totalCount: number;
}

interface Rate {
  limit: number;
  remaining: number;
  reset: number;
}
