import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { PatientService } from '../patient.service';
import { AppointmentService } from '../appointment.service';
import { Doctor } from '../models/Doctor';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Patient } from '../models/Patient';
import { AppointmentDetails } from '../models/AppointmentDetails';
import { AppointmentSchedule } from '../models/AppointmentSchedule';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  doctor: Doctor = new Doctor();
  id: String;
  patient: Patient = new Patient();
  slotEmpty: Boolean = true;
  appointmentSchedule: AppointmentSchedule[] = [];
  appoimentDetails: AppointmentDetails = new AppointmentDetails();
  appScheduleSunday: AppointmentSchedule[] = [];
  appScheduleMonday: AppointmentSchedule[] = [];
  appScheduleTuesday: AppointmentSchedule[] = [];
  appScheduleWednesday: AppointmentSchedule[] = [];
  appScheduleThursday: AppointmentSchedule[] = [];
  appScheduleFriday: AppointmentSchedule[] = [];
  appScheduleSaturday: AppointmentSchedule[] = [];
  constructor(private dservice: DoctorService, private pervice: PatientService, private aservice: AppointmentService, private aroute: ActivatedRoute, private router: Router) { }

  validDates = {
    // "2/1/2023":true,
    // "2/10/2023":true,
    // "2/12/2023":true,
    // "2/26/2023":true

    "0":true
  }

  filterDates:String[]=[];
  ngOnInit(): void {
    if (localStorage.getItem("current_user") != null && localStorage.getItem("user_email") != null && localStorage.getItem("current_user_type") != null) {

      this.aroute.params.subscribe(params => {
        this.id = params["id"];
      })
      let resp = this.dservice.getDoctorById(this.id);
      resp.subscribe(data => {
        if (data != null) {
          this.doctor = <Doctor>data;
          for (let aps of this.doctor.as) {
            let resp = this.aservice.getAppointmentBySlot(aps.id);
            resp.subscribe(data => {
              if (data == "NOT FOUND") {
                this.appointmentSchedule.push(aps);
                if (aps.schedule_DAY == "Sunday") {
                  this.appScheduleSunday.push(aps);
                }
                if (aps.schedule_DAY == "Monday") {
                  this.appScheduleMonday.push(aps);
                }
                if (aps.schedule_DAY == "Tuesday") {
                  this.appScheduleTuesday.push(aps);
                }
                if (aps.schedule_DAY == "Wednesday") {
                  this.appScheduleWednesday.push(aps);
                }
                if (aps.schedule_DAY == "Thursday") {
                  this.appScheduleThursday.push(aps);
                }
                if (aps.schedule_DAY == "Friday") {
                  this.appScheduleFriday.push(aps);
                }
                if (aps.schedule_DAY == "Saturday") {
                  this.appScheduleSaturday.push(aps);
                }
                this.slotEmpty = false;
              }



            });
          }
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
    this.appoimentDetails.tags = this.doctor.dd.first_NAME + " " + this.doctor.dd.last_NAME + "|" + this.patient.patientDetails.first_NAME + " " + this.patient.patientDetails.last_NAME + "|" + this.patient.patientDetails.mobile_NO + "|" + this.doctor.dd.mobile_NO + "|" + this.doctor.dd.email_ID + "|" + this.patient.patientDetails.email_ID;
    this.appoimentDetails.tags = this.appoimentDetails.tags.toLocaleLowerCase();
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

  myFilter = (d: Date): boolean => {
    console.log(d.getDay().toString());
   
    // Using a JS Object as a lookup table of valid dates
    // Undefined will be falsy.
    if(this.validDates[d.getDay().toString()]){
      console.log(new Date());
      this.filterDates.push(d.toLocaleDateString());
    }
    console.log(this.filterDates);
    return this.validDates[d.getDay().toString()];
  }



  

}
