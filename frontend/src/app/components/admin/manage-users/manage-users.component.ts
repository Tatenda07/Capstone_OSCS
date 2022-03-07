import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  providers: [UserService]
})
export class ManageUsersComponent implements OnInit {
  showHideUsersForm = false;
  users: any;
  userDetails: any;

  constructor(
    private router: Router,
    public userService: UserService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.resetUsersForm();
    this.refreshUsersList();
    this.showUsers();
  }

  toggleDisplayDivIf() {
    this.showHideUsersForm = !this.showHideUsersForm;
  }

  showUsers() {
    this.userService.getUsers()
      .subscribe((data: any) => this.users = data
      );
    console.log(this.users);
  }

    //reset users form (this is the method for the cancel button on the form)
    resetUsersForm(form ?: NgForm) {
      if (form)
        form.reset();

      this.userService.selectedUser ={
        _id: '',
        first_name: '',
        last_name: '',
        middle_initial: '',
        email: '',
        phone_number: '',
        password: '',
        role: '',
        createdAt : '',
        updatedAt : ''
      }

      this.showHideUsersForm = true;
      this.refreshUsersList();
    }

  //edit or update user info
  onEditUser(user : User) {
    this.userService.selectedUser = user;
    this.showHideUsersForm = false;
  }

  //refresh users list
  refreshUsersList() {
    this.userService.getUsers().subscribe((res) => {
      this.userService.usersList = res as User[];
    });

  }

  onSubmitUser(form : NgForm) {
    //add new user
    if (form.value._id == "") {
      this.userService.postUser(form.value).subscribe((res) => {
        this.resetUsersForm(form);
        this.showUsers();
        this.notificationService.showSuccess("New user added successfully.", "User Management");
      });

    //update existing user
    } else {
      this.userService.editUser(form.value).subscribe((res) => {
        this.resetUsersForm(form);
        this.showUsers();
        this.notificationService.showSuccess("User details has been updated successfully.", "User Management");
      });
    }
  }

  //delete user
  onDeleteUser(_id: string){
    if(confirm('Are you sure you want to delete this user?') == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.showUsers();
        this.notificationService.showInfo("User has been deleted.", "User Management");
      });
    }
  }

  //user logout
  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
