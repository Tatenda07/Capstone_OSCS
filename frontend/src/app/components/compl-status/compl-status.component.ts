import { Component, OnInit } from '@angular/core';

import { Complaint } from 'src/app/shared/models/complaint.model';
import { ComplaintService } from 'src/app/shared/services/complaint.service';

@Component({
  selector: 'app-compl-status',
  templateUrl: './compl-status.component.html',
  styleUrls: ['./compl-status.component.css'],
  providers: [ComplaintService]
})
export class ComplStatusComponent implements OnInit {

  constructor(public complaintService: ComplaintService) { }

  ngOnInit(): void {
    this.refreshCopmlaintsList();
  }

  refreshCopmlaintsList() {
    this.complaintService.getComplaint().subscribe((res) => {
      this.complaintService.allComplaints = res as Complaint[];
    });
  }

}
