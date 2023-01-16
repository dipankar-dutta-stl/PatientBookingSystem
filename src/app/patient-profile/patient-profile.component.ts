import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/Patient';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  patient:Patient=new Patient();
  disabled:Boolean=true;
  button:String="Edit";
  cancelButton:Boolean=false;
  constructor(private pService:PatientService,private router:Router) { }

  ngOnInit(): void {
      if(localStorage.getItem("current_user_type")=="PATIENT"){
        let resp=this.pService.doGetPatient(localStorage.getItem("user_email"));
        resp.subscribe(data=>{
          this.patient=<Patient>data;
          console.log(this.patient);
        })
      }
      else{
        this.router.navigateByUrl("error-message/YOU ARE NOT LOGED IN AS PATIENT.")
      }
  }

  doEditDetails():void{
    if(this.button=="Edit"){
      this.disabled=false;
      this.button="Save";
      this.cancelButton=true;
    }
    else{
      this.disabled=true;
      this.button="Edit";
      let resp= this.pService.doUpdatePatient(this.patient.patientDetails);
      resp.subscribe(data=>{
        if(data=="UPDATE SUCCESSFUL")
        alert(data);
      });
    }
   
  }

  doCancelEdit(){
    this.disabled=true;
    this.button="Edit";
    this.cancelButton=false;
  }

}
