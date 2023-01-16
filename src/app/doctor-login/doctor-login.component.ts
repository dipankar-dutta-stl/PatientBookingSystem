import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { DoctorLogin } from '../models/DoctorLogin';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {

  doctorlogin: DoctorLogin = new DoctorLogin();
  errormsg: String;
  constructor(private doctorService: DoctorService, private route: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("current_user_type") == "DOCTOR") {
      let resp = this.doctorService.doDoctorvalidateToken(localStorage.getItem("current_user"));
      resp.subscribe(data => {
        if (data == 'true') {
          this.route.navigateByUrl("/");
        }
      })
    }
    else if (localStorage.getItem("current_user_type") == "PATIENT") {
      this.route.navigateByUrl("error-message/" + "YOUR ARE LOGIN AS " + localStorage.getItem("current_user_type") + ". PLEASE LOGOUT FROM THERE.");
    }
  }

  doLogin(): void {

    let resp = this.doctorService.doDoctorLogin(this.doctorlogin);
    resp.subscribe(data => {
      if (data == "LOGIN FAILED") {
        this.route.navigateByUrl("error-message/LOGIN FAILED. CHECK EMAIL AND PASSWORD.");
      }
      else {
        localStorage.setItem("current_user", data);
        localStorage.setItem("user_email", this.doctorlogin.email_ID.toString());
        localStorage.setItem("current_user_type", "DOCTOR");
        this.route.navigateByUrl("/");
      }

    });







  }

}
