import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  getMyLocation(){
    return this.http.get("https://ipapi.co/json",{responseType:'json'});
  }
}
