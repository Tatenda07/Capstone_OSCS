import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  providers: [UserService, DatePipe]
})
export class ManageUsersComponent implements OnInit {
  showHideUsersForm = false;
  users: any;
  userDetails: any;
  currentDate: any = new Date();

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    public userService: UserService
  ) {
    this.currentDate = this.datePipe.transform(this.currentDate, 'EEEE, MMMM d, y');
   }

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
        this.refreshUsersList();
        alert('New User added Successfully!');
      });

    //update existing user
    } else {
      this.userService.editUser(form.value).subscribe((res) => {
        this.resetUsersForm(form);
        this.refreshUsersList();
        alert('User Information Updated Successfully');
      });
    }
  }

  //delete user
  onDeleteUser(_id: string){
    if(confirm('Are you sure you want to delete this User?') == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.refreshUsersList();
        alert('User eleted Successfully');
      });
    }
  }

  //user logout
  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
