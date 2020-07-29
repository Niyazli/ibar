import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { UserSearchDto } from '../../models/user-search.dto';
import { Pagination } from '../../../../models/response.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  public users: UserModel[];
  public pagination: Pagination;
  public userFilterDto: UserSearchDto;

  public loadingState = false;
  selectedUserId: number;
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.getData();
    this.userService.$deletedUserId.subscribe((id) => {
      const index = this.users.indexOf(this.users.find((u) => u.id === id));
      this.users.splice(index, 1);
    });
  }

  ngOnDestroy(): void {}

  public getData(): void {
    this.loadingState = true;
    if (!this.userFilterDto) {
      this.userFilterDto = new UserSearchDto();
    }
    this.userService.getAllUsers(this.userFilterDto).subscribe(
      (r) => {
        this.loadingState = false;
        this.users = r.result;
        this.pagination = r._meta;
      },
      () => (this.loadingState = false)
    );
  }

  handlePage(event: PageEvent) {
    this.userFilterDto.page = event.pageIndex + 1;
    this.getData();
  }
}
