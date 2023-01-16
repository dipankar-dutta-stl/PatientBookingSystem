import { Component, OnInit,Output} from '@angular/core';
import { PatientService } from '../patient.service';
import { DoctorLogin } from '../models/DoctorLogin';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  constructor(private pservice:PatientService,private dservice:DoctorService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("current_user_type")=="PATIENT"){
      let resp=this.pservice.validateToken(localStorage.getItem("current_user"));
      resp.subscribe(data=>{
        if(data=='false'){
          localStorage.removeItem("current_user");
          localStorage.removeItem("user_email");
          localStorage.removeItem("current_user_type");
          this.router.navigateByUrl("error-message/TOKEN EXPRIERED. PLEASE LOGIN AGAIN.");
        }
      })
    }
    else if(localStorage.getItem("current_user_type")=="DOCTOR"){
      let resp=this.dservice.doDoctorvalidateToken(localStorage.getItem("current_user"));
      resp.subscribe(data=>{
        if(data=='false'){
          localStorage.removeItem("current_user");
          localStorage.removeItem("user_email");
          localStorage.removeItem("current_user_type");
          this.router.navigateByUrl("error-message/TOKEN EXPRIERED. PLEASE LOGIN AGAIN.");
        }
      })
    }
  }

}
