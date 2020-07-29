export class UserModel {
  address: string;
  dob: string;
  email: string;
  first_name: string;
  gender: string;
  id: string;
  last_name: string;
  phone: string;
  status: string;
  website: string;
}

export class AdvancedUserModel extends UserModel {
  disabled?: boolean;
  _links: {
    avatar: Href;
    edit: Href;
    self: Href;
  };
}

interface Href {
  href: string;
}
