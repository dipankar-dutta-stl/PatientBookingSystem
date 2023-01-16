import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../models/Doctor';
import { Router } from '@angular/router';
import { AppointmentSchedule } from '../models/AppointmentSchedule';
@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  doctor: Doctor = new Doctor();
  appointmentSchedule: AppointmentSchedule = new AppointmentSchedule();
  disable: Boolean = true;
  button: String = "Edit";
  viewAddScheduleForm: Boolean = false;
  enableCancelButton: Boolean = false;
  disableSchedule: Boolean = true;
  constructor(private dService: DoctorService, private router: Router) { }

  ngOnInit(): void {
    let resp = this.dService.doDoctorvalidateToken(localStorage.getItem("current_user"));
    resp.subscribe(data => {
      if (data == 'false') {
        localStorage.removeItem("current_user");
        localStorage.removeItem("user_email");
        localStorage.removeItem("current_user_type");
        this.router.navigateByUrl("error-message/TOKEN EXPRIERED. PLEASE LOGIN AGAIN.");
      } else {
        if (localStorage.getItem("current_user_type") == "DOCTOR") {
          let resp = this.dService.getDoctor(localStorage.getItem("user_email"));
          resp.subscribe(data => {
            this.doctor = <Doctor>data;
            this.appointmentSchedule.schedule_DAY = "Choose...";
            console.log(this.doctor);
          });
        } else {
          this.router.navigateByUrl("error-message/YOU ARE NOT LOGGED IN AS DOCTOR.")
        }
      }
    })


  }

  // ACTIVATE EDITOR FOR DOCTOR DETAILS
  doEditDoctor() {
    if (this.button == "Edit") {
      this.button = "Save";
      this.disable = false;
      this.enableCancelButton = true;

    }
    else {
      let resp = this.dService.doUpdateDoctor(this.doctor.dd);
      resp.subscribe(data => {
        if (data == "UPDATE SUCCESSFUL") {
          alert(data);
        }
      }
      )
      this.button = "Edit";
      this.disable = true;
    }
  }

  // CANCEL EDITING FOR DOCTOR DETAILS
  doCancelEdit() {
    this.button = "Edit";
    this.disable = true;
    this.enableCancelButton = false;
  }

  // ADD APPOINTMENT SCHEDULE FOR DOCTOR
  addAppointmentSchedule() {
    this.appointmentSchedule.doctor_ID = this.doctor.dd.id;
    let resp = this.dService.doAddSchedule(this.appointmentSchedule);
    resp.subscribe(data => {
      console.log(data);
      if (data = "SUCCESSFULLY ADDED") {
        alert(data);
        this.ngOnInit();
        this.viewAddScheduleForm = false;
      }
    })
  }

  // DISPLAY FORM FOR SCHEDULE
  displayAddScheduleForm() {
    this.viewAddScheduleForm = true;
  }

  // DISABLE VIEW FOR SCHEDULE
  cancelAddAppointmentSchedule() {
    this.viewAddScheduleForm = false;

  }

  // DELETE SCHEDULE
  doDeleteSchedule(id: String) {
    let resp = this.dService.doDeleteSchedule(id);
    resp.subscribe(data => {
      if ("SCHEDULE DELETED") {
        alert(data);
        this.ngOnInit();
      } else {
        alert(data);
      }
    })

  }

  // ENABLE EDITOR FOR SCHEDULE
  doEditSchedule(as: AppointmentSchedule) {
    console.log(as);
    let resp = this.dService.doUpdateSchedule(as);
    resp.subscribe(data => {
      if (data == "UPDATE SUCCESSFULL") {
        this.ngOnInit();
      } else {
        alert(data);
      }

    })
    
  }

  doEnableEditor(as:AppointmentSchedule){
    this.appointmentSchedule=as;

  }

}
