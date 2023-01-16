import { Component, OnInit, Output ,EventEmitter, ContentChildren} from '@angular/core';
import { PatientLoging } from '../models/PatientLogin';
import { PatientService } from '../patient.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent implements OnInit {

  @ContentChildren(NavbarComponent)
  navbar:NavbarComponent;
  patient:PatientLoging=new PatientLoging();
  constructor(private patientservice:PatientService,private route:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("current_user_type")=="PATIENT"){
      let resp=this.patientservice.validateToken(localStorage.getItem("current_user"));
      resp.subscribe(data=>{
        if(data=='true'){
          this.route.navigateByUrl("/");
        }
      })
    }
    else if(localStorage.getItem("current_user_type")=="DOCTOR"){
      this.route.navigateByUrl("error-message/"+"YOUR ARE LOGIN AS "+localStorage.getItem("current_user_type")+". PLEASE LOGOUT FROM THERE.");
    }

  }

  submitLogin():void{
    let resp=this.patientservice.doLogin(this.patient);
    resp.subscribe(data=>{
      localStorage.setItem("current_user",data);
      localStorage.setItem("user_email",this.patient.email_ID);
      localStorage.setItem("current_user_type","PATIENT");
      this.route.navigateByUrl("/");
    })


  }

}
