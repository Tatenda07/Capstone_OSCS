import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Complaint } from 'src/app/shared/models/complaint.model';
import { ComplaintService } from 'src/app/shared/services/complaint.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-compl-status',
  templateUrl: './compl-status.component.html',
  styleUrls: ['./compl-status.component.css'],
  providers: [ComplaintService]
})
export class ComplStatusComponent implements OnInit {
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

    // hide or display complaints form
    toogleDisplayComplaintForm() {
      this.viewComplaintsForm = !this.viewComplaintsForm;
    }

    // get all complaints from the database
    showComplaints() {
      this.complaintService.getComplaint().subscribe((data: any) => this.complaints = data);
      console.log(this.complaints);
    }

    // reset complaints form
    resetComplaintForm(form ?: NgForm) {
      if (form)
        form.reset();
      this.complaintService.selectedComplaint = {
        _id: "",
        student_id: "",
        student_name: "",
        complaint_header: "",
        complaint_body: "",
        complaint_status: 2,
        resolution_id: "",
        createdAt: "",
        updatedAt: ""
      }
      this.viewComplaintsForm = false;
      this.refreshComplaintsList();
    }

    // on submit complaint
    onSubmitComplaint(form : NgForm) {
      //update complaint and change the status to moderated
      this.complaintService.moderateComplaint(form.value).subscribe((res) => {
        this.resetComplaintForm(form);
        this.refreshComplaintsList();
        this.notificationService.showSuccess("Complaint has been moderated successfully", "Complaint Management");
      });

    }

    //on edit complaint
    onEditComplaint(complaint : Complaint) {
      this.complaintService.selectedComplaint = complaint;
      this.viewComplaintsForm = true;
    }

    // refresh complaints list
    refreshComplaintsList() {
      this.complaintService.getComplaint().subscribe((res) => {
        this.complaintService.allComplaints = res as Complaint[];
      });
    }

    //delete complaint
    onDeleteComplaint(_id : string) {
      if(confirm('Are you sure you want to delete this complaint?') == true) {
        this.complaintService.deleteComplaint(_id).subscribe((res) => {
          this.refreshComplaintsList();
          this.notificationService.showInfo("Complaint has been deleted", "Complaints Management");
        });
      }
    }

  }
