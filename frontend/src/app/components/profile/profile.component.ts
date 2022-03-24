import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from 'src/app/shared/services/student.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [StudentService]
})
export class ProfileComponent implements OnInit {
  studentProfile: any;

  constructor(
    private studentService: StudentService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.studentService.getStudentProfile().subscribe((res: any) => {
      this.studentProfile = res['studentProfile']
    });
  }

}
