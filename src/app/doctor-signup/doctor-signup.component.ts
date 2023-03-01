import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/Doctor';
import { DoctorService } from '../doctor.service';
import { Router } from '@angular/router';
import { AppointmentSchedule } from '../models/AppointmentSchedule';
import { LocationService } from '../location.service';
@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrls: ['./doctor-signup.component.css']
})
export class DoctorSignupComponent implements OnInit {

  doctor: Doctor = new Doctor();
  appointmentSchedule: AppointmentSchedule = new AppointmentSchedule();
  confrimPassword: String;
  constructor(private dservice: DoctorService,private location:LocationService, private router: Router) { }

  ngOnInit(): void {
    let resp=this.location.getMyLocation();
    resp.subscribe(data=>{
      this.doctor.dd.city=data["city"];
      this.doctor.dd.state=data["region"];
      this.doctor.dd.pin=data["postal"];
    })
  }

  submitDetails(): void {

    if (this.doctor.dl.email_ID != null) {
      if (this.doctor.dl.password != null) {
        if (this.doctor.dd.mobile_NO != null) {
          if (this.doctor.dd.first_NAME != null) {
            if (this.doctor.dd.last_NAME != null) {
              if (this.doctor.dd.gender != null) {
                if (this.doctor.dd.chembar_ADDRESS != null) {
                  if (this.doctor.dd.specialization != null) {
                    if (this.doctor.dd.visiting_PRICE != null) {
                      if (this.appointmentSchedule.schedule_DAY != null) {
                        if (this.appointmentSchedule.schedule_TIME_START != null) {
                          if (this.appointmentSchedule.schedule_TIME_END != null) {
                            if (this.confrimPassword != null) {
                              if (this.confrimPassword == this.doctor.dl.password) {
                                this.doctor.as[0] = this.appointmentSchedule;
                                let resp = this.dservice.doAddDoctor(this.doctor);
                                resp.subscribe(data => {
                                  if (data == "REGISTRATION SUCCESSFULL") {
                                    this.router.navigateByUrl("success-message/" + data);
                                  }
                                  else {
                                    this.router.navigateByUrl("error-message/" + data);
                                  }
                                });
                              }
                              else {
                                alert("Confrim Password Not Matched.");
                              }

                            } else {
                              alert("Confrim password required.");
                            }

                          } else {
                            alert("Chembar end time required.");
                          }

                        } else {
                          alert("Chembar start time required.");
                        }

                      } else {
                        alert("Day required.");
                      }
                    } else {
                      alert("Price required.");
                    }
                  } else {
                    alert("Specialization required.");
                  }
                } else {
                  alert("Address required.");
                }
              } else {
                alert("Gender required.");
              }
            } else {
              alert("Last Name required.");
            }
          } else {
            alert("First Name required.");
          }
        } else {
          alert("Mobile No required.");
        }
      } else {
        alert("Password required.");
      }
    } else {
      alert("Email required.");
    }
  }

}
