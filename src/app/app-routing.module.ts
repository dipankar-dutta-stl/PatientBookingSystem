import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorSignupComponent } from './doctor-signup/doctor-signup.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { HomeComponent } from './home/home.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientSignupComponent } from './patient-signup/patient-signup.component';
import { SuccessMessageComponent } from './success-message/success-message.component';

const routes: Routes = [
   {path:"",component:HomeComponent},
  {path:"patient-login",component:PatientLoginComponent},
  {path:"patient-signup",component:PatientSignupComponent},
  {path:"success-message/:msg",component:SuccessMessageComponent},
  {path:"error-message/:emsg",component:ErrorMessageComponent},
  {path:"doctor-login",component:DoctorLoginComponent},
  {path:"doctor-signup",component:DoctorSignupComponent},
  {path:"doctor-profile/:email",component:DoctorProfileComponent},
  {path:"patient-profile/:email",component:PatientProfileComponent},
  {path:"doctors",component:DoctorComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
