import { Component, OnInit } from '@angular/core';
import { ServService } from 'src/app/service/server.service';

@Component({
  selector: 'app-success-registration',
  templateUrl: './success-registration.component.html',
  styleUrls: ['./success-registration.component.css','../../../../src/app/app.component.css']
})
export class SuccessRegistrationComponent implements OnInit {

  constructor(private service:ServService ) {}

  ngOnInit() {
    
  }

}
