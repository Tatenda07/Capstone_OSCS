import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Complaint } from 'src/app/shared/models/complaint.model';
import { ComplaintService } from 'src/app/shared/services/complaint.service';

@Component({
  selector: 'app-manage-complaints',
  templateUrl: './manage-complaints.component.html',
  styleUrls: ['./manage-complaints.component.css'],
  providers: [ComplaintService]
})
export class ManageComplaintsComponent implements OnInit {
  complaints: any;

  constructor(public complaintService: ComplaintService) { }

  ngOnInit() {
    this.refreshCopmlaintsList();
  }

  refreshCopmlaintsList() {
    this.complaintService.getComplaint().subscribe((res) => {
      this.complaintService.allComplaints = res as Complaint[];
    });
  }

}
