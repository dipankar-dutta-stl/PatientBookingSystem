import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../models/Doctor';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  doctor:Doctor;
  id:String;
  constructor(private dservice:DoctorService,private aroute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.aroute.params.subscribe(params=>{
      this.id=params["id"];
    })
    let resp=this.dservice.getDoctorById(this.id);
    resp.subscribe(data=>{
      if(data!=null){
        this.doctor=<Doctor>data;
        console.log(this.doctor)
      }
      else{
        this.router.navigateByUrl("error-message/"+"ERROR IN BOOKING");
      }
    })
  }

}
