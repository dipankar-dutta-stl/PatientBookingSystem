import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from '../models/Doctor';
import { DoctorService } from '../doctor.service';
import { Router } from '@angular/router';
import { AppointmentSchedule } from '../models/AppointmentSchedule';
import { LocationService } from '../location.service';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private dService: DoctorService, private router: Router, private location: LocationService) { }

  alldoctors: Doctor;
  appScheduleSunday: AppointmentSchedule[] = [];
  appScheduleMonday: AppointmentSchedule[] = [];
  appScheduleTuesday: AppointmentSchedule[] = [];
  appScheduleWednesday: AppointmentSchedule[] = [];
  appScheduleThursday: AppointmentSchedule[] = [];
  appScheduleFriday: AppointmentSchedule[] = [];
  appScheduleSaturday: AppointmentSchedule[] = [];

  myCity: String;
  docSpcial: String = "Select Specialization";

  ngOnInit(): void {
    this.myCity = localStorage.getItem("loc");
    let resp = this.dService.doGetDoctorByLocation(this.myCity);
    resp.subscribe(data => {
      this.alldoctors = <Doctor>data;
      for (let d in this.alldoctors) {
        for (let a in this.alldoctors[d].as) {
          if (this.alldoctors[d].as[a].schedule_DAY == "Sunday") {
            this.appScheduleSunday.push(this.alldoctors[d].as[a]);
          }
          if (this.alldoctors[d].as[a].schedule_DAY == "Monday") {
            this.appScheduleMonday.push(this.alldoctors[d].as[a]);
          }
          if (this.alldoctors[d].as[a].schedule_DAY == "Tuesday") {
            this.appScheduleTuesday.push(this.alldoctors[d].as[a]);
          }
          if (this.alldoctors[d].as[a].schedule_DAY == "Wednesday") {
            this.appScheduleWednesday.push(this.alldoctors[d].as[a]);
          }
          if (this.alldoctors[d].as[a].schedule_DAY == "Thursday") {
            this.appScheduleThursday.push(this.alldoctors[d].as[a]);
          }
          if (this.alldoctors[d].as[a].schedule_DAY == "Friday") {
            this.appScheduleFriday.push(this.alldoctors[d].as[a]);
          }
          if (this.alldoctors[d].as[a].schedule_DAY == "Saturday") {
            this.appScheduleSaturday.push(this.alldoctors[d].as[a]);
          }
        }
      }
    });
  }

  doBookAppointment(id: String) {
    if (localStorage.getItem("current_user") != null && localStorage.getItem("user_email") != null && localStorage.getItem("current_user_type") != null) {
      if (localStorage.getItem("current_user_type") == "PATIENT") {
        this.router.navigateByUrl("/book-appointment/d/" + id);
      } else {
        alert("Please Login as Patient");
      }
    }
    else {
      alert("Please login ")
    }
  }

  checkSchedule(appS: AppointmentSchedule[], did: String) {
    let typeExists = false;
    for (let as of appS) {
      if (as.doctor_ID == did) {
        typeExists = true;
      }
    }
    return typeExists;
  }

  getSchedule(appS: AppointmentSchedule[], did: String) {
    let schedule: AppointmentSchedule[] = [];
    for (let as of appS) {
      if (as.doctor_ID == did) {
        schedule.push(as);
      }
    }
    return schedule;
  }

  setSpecialization(spcl: String) {
    this.docSpcial = spcl;
  }

  resetSpecilization() {
    this.docSpcial = "Select Specialization";
  }

  setCurrentLocation() {
    let locResp = this.location.getMyLocation();
    locResp.subscribe(data => {
      this.myCity = data["city"];
    })
  }

  filterDoctorbyLocationAndSpecialization() {
    this.resetSlots();
    if (this.docSpcial != "Select Specialization") {
      console.log(this.docSpcial);
      let resp = this.dService.doGetDoctorByLocationAndSpecialization(this.myCity, this.docSpcial);
      resp.subscribe(data => {
        this.alldoctors = <Doctor>data;
        console.log(data);
        for (let d in this.alldoctors) {
          for (let a in this.alldoctors[d].as) {
            if (this.alldoctors[d].as[a].schedule_DAY == "Sunday") {
              this.appScheduleSunday.push(this.alldoctors[d].as[a]);
            }
            if (this.alldoctors[d].as[a].schedule_DAY == "Monday") {
              this.appScheduleMonday.push(this.alldoctors[d].as[a]);
            }
            if (this.alldoctors[d].as[a].schedule_DAY == "Tuesday") {
              this.appScheduleTuesday.push(this.alldoctors[d].as[a]);
            }
            if (this.alldoctors[d].as[a].schedule_DAY == "Wednesday") {
              this.appScheduleWednesday.push(this.alldoctors[d].as[a]);
            }
            if (this.alldoctors[d].as[a].schedule_DAY == "Thursday") {
              this.appScheduleThursday.push(this.alldoctors[d].as[a]);
            }
            if (this.alldoctors[d].as[a].schedule_DAY == "Friday") {
              this.appScheduleFriday.push(this.alldoctors[d].as[a]);
            }
            if (this.alldoctors[d].as[a].schedule_DAY == "Saturday") {
              this.appScheduleSaturday.push(this.alldoctors[d].as[a]);
            }
          }
        }
      });
    }
    else {
      this.resetSlots();
      let resp = this.dService.doGetDoctorByLocation(this.myCity);
      resp.subscribe(data => {
        this.alldoctors = <Doctor>data;
        for (let d in this.alldoctors) {
          for (let a in this.alldoctors[d].as) {
            if (this.alldoctors[d].as[a].schedule_DAY == "Sunday") {
              this.appScheduleSunday.push(this.alldoctors[d].as[a]);
            }
            if (this.alldoctors[d].as[a].schedule_DAY == "Monday") {
              this.appScheduleMonday.push(this.alldoctors[d].as[a]);
            }
            if (this.alldoctors[d].as[a].schedule_DAY == "Tuesday") {
              this.appScheduleTuesday.push(this.alldoctors[d].as[a]);
            }
            if (this.alldoctors[d].as[a].schedule_DAY == "Wednesday") {
              this.appScheduleWednesday.push(this.alldoctors[d].as[a]);
            }
            if (this.alldoctors[d].as[a].schedule_DAY == "Thursday") {
              this.appScheduleThursday.push(this.alldoctors[d].as[a]);
            }
            if (this.alldoctors[d].as[a].schedule_DAY == "Friday") {
              this.appScheduleFriday.push(this.alldoctors[d].as[a]);
            }
            if (this.alldoctors[d].as[a].schedule_DAY == "Saturday") {
              this.appScheduleSaturday.push(this.alldoctors[d].as[a]);
            }
          }
        }
      });
    }
  }


  resetSlots() {
    this.appScheduleSunday = [];
    this.appScheduleMonday = [];
    this.appScheduleTuesday = [];
    this.appScheduleWednesday = [];
    this.appScheduleThursday = [];
    this.appScheduleFriday = [];
    this.appScheduleSaturday = [];
  }
}
