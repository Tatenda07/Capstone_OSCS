import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { Student } from 'src/app/shared/models/student.model';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
  providers: [StudentService]
})
export class LoginSignupComponent implements OnInit {

  constructor(
    public studentService: StudentService,
    private notificationService: NotificationService,
    private router: Router
    ) { }

  model = {
    student_id :'',
    password:''
  };

  serverErrorMessages!: string;

  ngOnInit(): void {
    this.resetLogInForm();
    this.resetSignUpForm();
  }

  //reset Sign Up form (this is the method for the cancel button on the Sign Up form)
  resetSignUpForm(form ?: NgForm) {
    if (form)
      form.reset();

    this.studentService.selectedStudent = {
      _id: '',
      student_id: '',
      first_name: '',
      last_name: '',
      middle_initial: '',
      college: '',
      email: '',
      phone_number: '',
      password: '',
      role: '',
      createdAt : '',
      updatedAt : '',
      account_status: 1
    }
  }

  // reset Login form when cancel button is clicked
  resetLogInForm(form ?: NgForm) {
    if (form)
      form.reset();
    this.model = {
      student_id: "",
      password: ""
    }
  }

  // login student
  onLogin(form : NgForm) {
    this.studentService.login(form.value).subscribe((res: any) => {
      this.studentService.setToken(res.token);
      this.router.navigateByUrl('/home');
    }, (err) => {
      this.serverErrorMessages = err.error.message;
    });
  }

 // sign-up student: create new account
 onSignUp(form : NgForm) {
  this.studentService.postStudent(form.value).subscribe((res) => {
    this.resetSignUpForm(form);
    this.router.navigate(['/login']);
    this.notificationService.showSuccess("Account registered successfully. You may now login with your account.", "New Student Registration");
  });
 }

}
