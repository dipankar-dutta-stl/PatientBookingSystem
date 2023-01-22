import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppointmentDetails } from './models/AppointmentDetails';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }

  doBookAppointment(ad:AppointmentDetails){
    return this.http.post("http://localhost:8003/api/v1/appointment/add",ad,{responseType:'text'})
  }

  getAppointmentByDoctorId(id:String){
    return this.http.get("http://localhost:8003/api/v1/appointment/get/d/"+id,{responseType:'json'});
  }

  getAppointmentByPatientId(id:String){
    return this.http.get("http://localhost:8003/api/v1/appointment/get/p/"+id,{responseType:'json'});
  }

  acceptAppointmentById(id:String){
    return this.http.put("http://localhost:8003/api/v1/appointment/update/"+id,{});
  }
}
