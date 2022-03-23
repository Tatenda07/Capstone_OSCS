import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/shared/services/student.service';
import { ComplaintService } from 'src/app/shared/services/complaint.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
  providers: [ComplaintService]
})
export class ComplaintsComponent implements OnInit {
  complaints: any;
  studentProfile: any;

  constructor(
    public complaintService: ComplaintService,
    private notificationService : NotificationService,
    private studentService: StudentService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.resetcomplaintForm();
    this.studentService.getStudentProfile().subscribe((res: any) => {
      this.studentProfile = res['studentProfile']
    });
  }

  // reset complaints form
  resetcomplaintForm(form ?: NgForm) {
    if (form)
      form.reset();

    this.complaintService.selectedComplaint = {
      _id: '',
      student_id: '',
      student_name: '',
      complaint_header: '',
      complaint_body: '',
      complaint_status: 1,
      resolution_id: '',
      createdAt: '',
      updatedAt: ''
    }
  }

  onSubmitComplaint(form : NgForm) {
    // automatically attach student name and id to the complaint
    form.value.student_name = this.studentProfile.first_name + ' ' + this.studentProfile.last_name;
    form.value.student_id = this.studentProfile.student_id;
    // add new complaint
    this.complaintService.postComplaint(form.value).subscribe((res) => {
      this.resetcomplaintForm(form);
      this.notificationService.showSuccess("Complaint has been submitted successfully", "Complaint Management");
      this.router.navigateByUrl('/compl-status');
    });

  }

}

