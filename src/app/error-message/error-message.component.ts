import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  errorMessage:String;
  constructor(private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params=>{
      this.errorMessage=params['emsg'];
    })
  }

}
