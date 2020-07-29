import { PageDto } from '../../../models/page.dto';

export class UserSearchDto extends PageDto {
  first_name: string;

  constructor(first_name = '') {
    super();
    this.first_name = first_name;
  }
}
