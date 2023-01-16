import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/Patient';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patient-signup',
  templateUrl: './patient-signup.component.html',
  styleUrls: ['./patient-signup.component.css']
})
export class PatientSignupComponent implements OnInit {

  patient:Patient=new Patient();
  confrimPassword:String;
  constructor(private pService:PatientService,private router:Router) { }

  ngOnInit(): void {
    
  }

  Signup():void{
    if(this.confrimPassword==this.patient.patientLogin.password){
      let resp =this.pService.doSignup(this.patient);
      resp.subscribe(data=>{
        if(data=="SUCCESSFULLY REGISTERED."){
          this.router.navigateByUrl("success-message/SUCCESSFULLY REGISTERED.");
        }
        else{
          this.router.navigateByUrl("error-message/"+data);
        }
      })
    }
    else{
      alert("Password Not Matched");
    }
    
  }

}
