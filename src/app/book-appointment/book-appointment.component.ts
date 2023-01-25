import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { PatientService } from '../patient.service';
import { AppointmentService } from '../appointment.service';
import { Doctor } from '../models/Doctor';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Patient } from '../models/Patient';
import { AppointmentDetails } from '../models/AppointmentDetails';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  doctor: Doctor = new Doctor();
  id: String;
  patient: Patient = new Patient();
  appoimentDetails: AppointmentDetails = new AppointmentDetails();
  constructor(private dservice: DoctorService, private pervice: PatientService, private aservice: AppointmentService, private aroute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("current_user") != null && localStorage.getItem("user_email") != null && localStorage.getItem("current_user_type") != null) {

      this.aroute.params.subscribe(params => {
        this.id = params["id"];
      })
      let resp = this.dservice.getDoctorById(this.id);
      resp.subscribe(data => {
        if (data != null) {
          this.doctor = <Doctor>data;

        }
        else {
          this.router.navigateByUrl("error-message/" + "ERROR");
        }
      })

      let resp1 = this.pervice.doGetPatient(localStorage.getItem("user_email"));
      resp1.subscribe(data => {
        if (data != null) {
          this.patient = <Patient>data;
        }
        else {
          this.router.navigateByUrl("error-message/" + "ERROR");
        }
      })

    } else {
      this.router.navigateByUrl("error-message/" + "PLEASE LOGIN TO BOOK APPOINTMENT");
    }

  }

  bookAppointment() {
    this.appoimentDetails.doctor_ID = this.doctor.dd.id;
    this.appoimentDetails.patient_ID = this.patient.patientDetails.id;
    this.appoimentDetails.appointment_CONFRIMED = "NOT CONFRIMED";
    this.appoimentDetails.tags=this.doctor.dd.first_NAME+" "+this.doctor.dd.last_NAME+"|"+this.patient.patientDetails.first_NAME+" "+this.patient.patientDetails.last_NAME+"|"+this.patient.patientDetails.mobile_NO+"|"+this.doctor.dd.mobile_NO+"|"+this.doctor.dd.email_ID+"|"+this.patient.patientDetails.email_ID;
    this.appoimentDetails.tags=this.appoimentDetails.tags.toLocaleLowerCase();
    if (this.appoimentDetails != null) {
      if (this.appoimentDetails.appointment_SCHEDULE_ID != null) {
        console.log(this.appoimentDetails);
        let resp = this.aservice.doBookAppointment(this.appoimentDetails);
        resp.subscribe(data => {
          if (data == "APPOINTMENT BOOK SUCCESSFULLY") {
            this.router.navigateByUrl("success-message/" + data);
          } else {
            this.router.navigateByUrl("error-message/" + data);
          }
        })
      }
    }
    else {
      alert("PLEASE SUBMIT DATA")
    }
    
  }

}
