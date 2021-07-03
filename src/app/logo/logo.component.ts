import { Component, OnInit } from '@angular/core';
import { ConnectableObservable } from 'rxjs';
import { Connect } from '../Class/Connect';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css','./../../../src/app/app.component.css']
})
export class LogoComponent implements OnInit {

  constructor() { }
connect:Connect;
  ngOnInit() {
  }

}
