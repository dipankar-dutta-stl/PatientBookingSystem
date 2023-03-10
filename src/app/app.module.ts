import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { PatientService } from './patient.service';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { FooterComponent } from './footer/footer.component';
import { PatientSignupComponent } from './patient-signup/patient-signup.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { DoctorSignupComponent } from './doctor-signup/doctor-signup.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { DoctorComponent } from './doctor/doctor.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PatientLoginComponent,
    FooterComponent,
    PatientSignupComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    DoctorLoginComponent,
    DoctorSignupComponent,
    DoctorProfileComponent,
    PatientProfileComponent,
    DoctorComponent,
    BookAppointmentComponent,
    AppointmentDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,  
  ],
  providers: [PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
