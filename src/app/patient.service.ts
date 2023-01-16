import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from './models/Patient';
import { HttpHeaders } from '@angular/common/http';
import { PatientDetails } from './models/patientDetails';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }

  doLogin(plogin:any){
   return this.http.post("http://localhost:8002/api/v1/patient/authenticate",plogin,{responseType:'text'});
  }

  doSignup(p:Patient){
    return this.http.post("http://localhost:8002/api/v1/patient/add",p,{responseType:'text'});
  }

  validateToken(token:String){
    return this.http.get("http://localhost:8002/api/v1/patient/validade-token/"+token,{responseType:'text'});

  }

  doGetPatient(email:String){
    const header=new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("current_user")});
    return this.http.get("http://localhost:8002/api/v1/patient/get/"+email,{headers:header,responseType:'json'});
  }

  doUpdatePatient(pdetails:PatientDetails){
    const header=new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("current_user")});
    return this.http.put("http://localhost:8002/api/v1/patient/update",pdetails,{headers:header,responseType:'text'});
  }
}
