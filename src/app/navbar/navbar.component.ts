import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()user_email:String;
  constructor(private route:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("current_user")!=""){
      this.user_email=localStorage.getItem("user_email");
    }
  }

  doLogOut(){
    localStorage.removeItem("user_email");
    localStorage.removeItem("current_user");
    localStorage.removeItem("current_user_type");
    this.route.navigateByUrl("/");
    this.ngOnInit();
  }

  goToProfile(){
    if(localStorage.getItem("current_user_type")=="PATIENT"){
      this.route.navigateByUrl("patient-profile/"+localStorage.getItem("user_email"));
    }
    else{
      this.route.navigateByUrl("doctor-profile/"+localStorage.getItem("user_email"));
    }
  }

}
