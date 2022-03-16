import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Resolution } from 'src/app/shared/models/resolution.model';
import { ResolutionService } from 'src/app/shared/services/resolution.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-resolution',
  templateUrl: './resolution.component.html',
  styleUrls: ['./resolution.component.css'],
  providers: [ResolutionService]
})
export class ResolutionComponent implements OnInit {
  viewResolutionForm = false;
  resolutions: any;

  constructor(
    public resolutionService: ResolutionService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetResolutionForm();
    this.refreshResolutionsList()
  }

  // hide or display complaints form
  toogleDisplayResolutionsForm() {
    this.viewResolutionForm = !this.viewResolutionForm;
  }

  // get all resolutions from the database
  showResolutions() {
    this.resolutionService.getResolution().subscribe((data: any) => this.resolutions = data);
    console.log(this.resolutions);
  }

  // reset resolutions form
  resetResolutionForm(form ?: NgForm) {
    if (form)
      form.reset();
    this.resolutionService.selectedResolution = {
      _id: "",
      complaint_id: "",
      user_id: "",
      resolution_header: "",
      resolution_body: "",
      createdAt: "",
      updatedAt: ""
    }
    this.viewResolutionForm = false;
    this.refreshResolutionsList();
  }

  // on submit resolution
  onSubmitResolution(form : NgForm) {
    // add new resolution
    if (form.value._id === ""){
      this.resolutionService.postResolution(form.value).subscribe((res) => {
        this.resetResolutionForm(form);
        this.refreshResolutionsList();
        this.notificationService.showSuccess("New Resolution added successfully", "Resolutions Management");
      });
    // update existing resolution
    } else {
      this.resolutionService.editResolution(form.value).subscribe((res) => {
        this.resetResolutionForm(form);
        this.refreshResolutionsList();
        this.notificationService.showSuccess("Resolution has been updated successfully", "Resolutions Management");
      });
    }
  }

  //on edit resolution
  onEditResolution(resolution : Resolution) {
    this.resolutionService.selectedResolution = resolution;
    this.viewResolutionForm = true;
  }

  // refresh resolutions list
  refreshResolutionsList() {
    this.resolutionService.getResolution().subscribe((res) => {
      this.resolutionService.allResolutions = res as Resolution[];
    });
  }

  //delete resolution
  onDeleteResolution(_id : string) {
    if(confirm('Are you sure you want to delete this resolution?') == true) {
      this.resolutionService.deleteResolution(_id).subscribe((res) => {
        this.refreshResolutionsList();
        this.notificationService.showInfo("Resolution has been deleted", "Resolutions Management");
      });
    }
  }

}
