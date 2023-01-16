import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  current_user_email:String;
  title = 'PatientAppointmentBookingSystem';

  emailSet(){
    this.current_user_email=localStorage.getItem("user_email");
  }
}
