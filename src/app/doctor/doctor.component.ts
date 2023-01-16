import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/Doctor';
import { DoctorService } from '../doctor.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private dService:DoctorService,private router:Router) { }

  alldoctors:Doctor;
  ngOnInit(): void {
    let resp=this.dService.doGetAllDoctor();
    resp.subscribe(data=>{
      this.alldoctors=<Doctor>data;
    });
  }

  doBookAppointment(){
    if(localStorage.getItem("current_user")!=null && localStorage.getItem("user_email")!=null && localStorage.getItem("current_user_type")!=null){
      
    }
    else{
      alert("Please login ")
    }
  }

}
