import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Complaint } from 'src/app/shared/models/complaint.model';
import { ComplaintService } from 'src/app/shared/services/complaint.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  viewComplaintsForm = false;
  complaints: any;

  constructor(
    public complaintService: ComplaintService,
    private notificationService : NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetComplaintForm();
    this.refreshComplaintsList();
  }

  // reset complaints form
  resetComplaintForm(form ?: NgForm) {
    if (form)
      form.reset();

    this.refreshComplaintsList();
  }
  refreshComplaintsList() {
    this.complaintService.getComplaint().subscribe((res) => {
      this.complaintService.allComplaints = res as Complaint[];
    });
  }

  onSubmitComplaint(form : NgForm) {
    // add new complaint
    this.complaintService.postComplaint(form.value).subscribe((res) => {
      this.resetComplaintForm(form);
      this.refreshComplaintsList();
      this.notificationService.showSuccess("Complaint has been submitted successfully", "Complaint Management");
    });

  }

}
