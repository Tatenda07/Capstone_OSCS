import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Complaint } from 'src/app/shared/models/complaint.model';
import { ComplaintService } from 'src/app/shared/services/complaint.service';
import { UserService } from 'src/app/shared/services/user.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ResolutionService } from 'src/app/shared/services/resolution.service';

@Component({
  selector: 'app-manage-complaints',
  templateUrl: './manage-complaints.component.html',
  styleUrls: ['./manage-complaints.component.css'],
  providers: [ComplaintService, UserService]
})
export class ManageComplaintsComponent implements OnInit {
  viewComplaintsForm = false;
  viewComplaintResolution = false;
  viewResolutionDiv = false;
  specificResolution: any;
  complaints: any;
  userProfile: any;

  constructor(
    public complaintService: ComplaintService,
    private resolutionService: ResolutionService,
    private userService: UserService,
    private notificationService : NotificationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.resetComplaintForm();
    this.refreshComplaintsList();
    this.userService.getUserProfile().subscribe((res: any) => {
      this.userProfile = res['userProfile']
    });
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
      moderated_by: undefined,
      resolution_id: "",
      createdAt: "",
      updatedAt: ""
    }
    this.viewComplaintsForm = false;
    this.refreshComplaintsList();
  }

  // on submit complaint
  onSubmitComplaint(form : NgForm) {
    // atumatically attach moderator username to the complaint
    form.value.moderated_by = this.userProfile.username;
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
        this.viewComplaintResolution = false;
        this.notificationService.showInfo("Complaint has been deleted", "Complaints Management");
      });
    }
  }

  // view complaint to be resolved
  viewComplaint(complaint: Complaint) {
    this.complaintService.selectedComplaint = complaint;
  }

  // view resolution
  viewResolution(_id : string) {
    this.resolutionService.getSingleResolution(_id).subscribe((res) => {
      this.specificResolution = res;
    });
    this.viewComplaintResolution = true;
    this.viewResolutionDiv = true;
    this.viewComplaintsForm = false;
  }

}
