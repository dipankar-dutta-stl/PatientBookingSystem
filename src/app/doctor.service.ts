import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { DoctorLogin } from './models/DoctorLogin';
import { Doctor } from './models/Doctor';
import { DoctorDetails } from './models/DoctorDetails';
import { AppointmentSchedule } from './models/AppointmentSchedule';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  doDoctorLogin(doctorLogin:DoctorLogin){
    return this.http.post("http://localhost:8001/api/v1/doctor/authenticate",doctorLogin,{responseType:'text'})
  }

  doDoctorvalidateToken(token:String){
    return this.http.get("http://localhost:8001/api/v1/doctor/validate/"+token,{responseType:'text'});

  }

  doAddDoctor(d:Doctor){
    return this.http.post("http://localhost:8001/api/v1/doctor/add",d,{responseType:"text"})
  }

  getDoctor(email:String){
    const header=new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("current_user")});
    return this.http.get("http://localhost:8001/api/v1/doctor/get/"+email,{headers:header,responseType:'json'});
  }

  getDoctorById(id:String){
    return this.http.get("http://localhost:8001/api/v1/doctor/get/id/"+id,{responseType:'json'});
  }

  doUpdateDoctor(doctorDetails:DoctorDetails){
    const header=new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("current_user")});
    return this.http.put("http://localhost:8001/api/v1/doctor/update",doctorDetails,{headers:header,responseType:'text'})
  }

  doAddSchedule(aSchedule:AppointmentSchedule){
    const header=new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("current_user")});
    return this.http.post("http://localhost:8001/api/v1/doctor/addschedule",aSchedule,{headers:header,responseType:'text'})
  }

  doDeleteSchedule(id:String){
    const header=new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("current_user")});
    return this.http.delete("http://localhost:8001/api/v1/doctor/deleteschedule/"+id,{headers:header,responseType:'text'})
  }

  doGetAllDoctor(){
    return this.http.get("http://localhost:8001/api/v1/doctor/alldoctors",{responseType:'json'});
  }

  doUpdateSchedule(as:AppointmentSchedule){
    const header=new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("current_user")});
    return this.http.put("http://localhost:8001/api/v1/doctor/updateschedule",as,{headers:header,responseType:'text'})
  }

  doGetDoctorByLocation(loc:String){
    const params=new HttpParams().append("loc",loc.toString());
    return this.http.get("http://localhost:8001/api/v1/doctor/doctors",{responseType:'json',params:params});
  }

  doGetDoctorByLocationAndSpecialization(loc:String,spcl:String){
    const params=new HttpParams().append("loc",loc.toString()).append("spcl",spcl.toString());
    return this.http.get("http://localhost:8001/api/v1/doctor/doctors/loc&spcl",{responseType:'json',params:params});
  }
}
