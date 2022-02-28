import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Complaint } from '../models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  readonly baseURL = 'http://localhost:5000/complaint';
  selectedComplaint!: Complaint;

  allComplaints!: Complaint[];

  constructor(private http: HttpClient) { }

  //add new complaint
  postComplaint(complaint : Complaint) {
    return this.http.post(this.baseURL, complaint);
  }

  //get all complaints
  getComplaint() {
    return this.http.get(this.baseURL);
  }

  //delete complaint
  deleteComplaint(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  //edit complaint
  editComplaint(complaint : Complaint) {
    return this.http.patch(this.baseURL + `/${complaint._id}`, complaint);
  }
}
