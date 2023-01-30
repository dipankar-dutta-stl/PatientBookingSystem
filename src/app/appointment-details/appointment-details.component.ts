import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { DoctorService } from '../doctor.service';
import { PatientService } from '../patient.service';
import { Doctor } from '../models/Doctor';
import { Patient } from '../models/Patient';
import { ADetails } from '../models/ADetails';
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  doctor: Doctor = new Doctor();
  patient: Patient = new Patient();
  appdetails: ADetails = new ADetails();
  tempList: ADetails[] = [];
  isDoctor: Boolean;
  searchKey: String;
  showSearch: Boolean = false;
  mainTable: Boolean = true;
  constructor(private router: Router, private dservice: DoctorService, private pservice: PatientService, private aservice: AppointmentService) { }

  ngOnInit(): void {
    this.searchKey=null;
    this.showSearch = false;
    this.mainTable = true;
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

    if (localStorage.getItem("current_user") != null && localStorage.getItem("user_email") != null && localStorage.getItem("current_user_type") != null) {
      if (localStorage.getItem("current_user_type") == "DOCTOR") {
        this.isDoctor = true;
        let resp = this.dservice.getDoctor(localStorage.getItem("user_email"));
        resp.subscribe(data => {
          if (data != null) {
            this.doctor = <Doctor>data;
            let resp2 = this.aservice.getAppointmentByDoctorId(this.doctor.dd.id);
            resp2.subscribe(data => {
              if (data != null) {
                this.appdetails = <ADetails>data;
              }
            })
          }
        })
      }
      else {
        this.isDoctor = false;
        let resp = this.pservice.doGetPatient(localStorage.getItem("user_email"));
        resp.subscribe(data => {
          if (data != null) {

            this.patient = <Patient>data;
            let resp2 = this.aservice.getAppointmentByPatientId(this.patient.patientDetails.id);
            resp2.subscribe(data => {
              if (data != null) {
                this.appdetails = <ADetails>data;
              }
            })
          }
        })
      }
    }
    else {
      this.router.navigateByUrl("error-message/" + "PLEASE LOGIN TO TO CHECK APPOINTMENT");
    }
  }

  acceptAppointment(id: String) {
    let resp = this.aservice.acceptAppointmentById(id);
    resp.subscribe(data => {
      this.ngOnInit();

    }, error => {
      this.ngOnInit();
    });
    this.ngOnInit();
  }

  searchAppointment() {

    this.tempList = [];
    if (this.searchKey != null) {
      this.showSearch = true;
      this.mainTable = false;
      for (let i in this.appdetails) {
        if (this.appdetails[i].tags.includes(this.searchKey.toLowerCase())) {
          this.tempList.push(this.appdetails[i]);
        }
      }

    } else {
      alert("Key Not Available");
    }

  }

  cancelSearch() {
    this.showSearch = false;
    this.mainTable = true;
    this.searchKey = null;
  }

}
