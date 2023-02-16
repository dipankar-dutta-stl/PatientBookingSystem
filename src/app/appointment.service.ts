import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppointmentDetails } from './models/AppointmentDetails';
import { ADetails } from './models/ADetails';
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
    return this.http.put("http://localhost:8003/api/v1/appointment/update/"+id,{responseType:'json'});
  }

 
  getAppointmentBySlot(id:String){
    return this.http.get("http://localhost:8003/api/v1/appointment/slot/"+id,{responseType:'text'});
  }

  doDeleteAppointmentById(id:String){
    return this.http.delete("http://localhost:8003/api/v1/appointment/delete/"+id,{responseType:'text'});
  }
}
