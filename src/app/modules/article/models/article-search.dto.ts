import { PageDto } from '../../../models/page.dto';

export class ArticleSearchDto extends PageDto {
  user_id: string;

  constructor(userId = '') {
    super();
    this.user_id = userId;
  }
}
