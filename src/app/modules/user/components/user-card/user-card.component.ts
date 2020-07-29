import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AdvancedUserModel } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  currentUser: AdvancedUserModel;
  userForm: FormGroup;

  private readonly avatarUrl = 'https://lorempixel.com/250/250/people/?98570';
  private readonly websiteUrl =
    'https://www.gleichner.com/aliquam-quia-nemo-et-est-rerum-suscipit';

  constructor(public userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userService.selectedUser.subscribe((user) => {
      this.currentUser = user;
      this.currentUser.disabled = true;
      this.buildForm(this.currentUser);
    });
  }

  buildForm(user?) {
    if (user) {
      this.userForm = this.fb.group({
        address: [user.address],
        first_name: [user.first_name],
        dob: [user.dob],
        email: [user.email],
        gender: [user.gender],
        last_name: [user.last_name],
        phone: [user.phone],
        website: [user.website],
      });
    } else {
      this.userForm = this.fb.group({
        address: [''],
        avatar: [this.avatarUrl],
        dob: [''],
        email: ['', [Validators.required, Validators.email]],
        first_name: [''],
        gender: [''],
        last_name: [''],
        phone: [''],
        website: [this.websiteUrl],
      });
    }
  }

  handleUpdate() {
    const prevData = this.currentUser;
    this.userService
      .updateUser(this.currentUser.id, this.userForm.value)
      .subscribe(
        (r) => {
          this.currentUser = r.result;
          this.buildForm(this.currentUser);
        },
        () => this.buildForm(prevData)
      );
  }

  handleDelete() {
    const prevData = this.currentUser;
    this.userService.deleteUser(this.currentUser.id).subscribe(
      (r) => {
        this.userService.$deletedUserId.emit(this.currentUser.id);
        this.currentUser = null;
      },
      () => this.buildForm(prevData)
    );
  }

  handleCreateUser() {
    this.buildForm();
    this.currentUser.first_name = 'Create name';
    this.currentUser.last_name = 'Create last name';
    this.currentUser.id = null;
    this.currentUser._links.avatar.href = this.avatarUrl;
  }

  handleSave() {
    this.userService
      .createUser(this.userForm.value)
      .subscribe((r) => console.log(r));
  }
}
