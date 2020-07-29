export class PageDto {
  page: number;
  size: number;

  constructor(page = 1, size = 5) {
    this.page = page;
    this.size = size;
  }
}
