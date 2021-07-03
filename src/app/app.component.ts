import { Component, OnInit } from "@angular/core";
import { ServService } from "./service/server.service";
import { HeaderComponent } from "./header/header.component";
import { triggerAsyncId, triggerId } from "async_hooks";
import { AfterViewInit, ElementRef} from '@angular/core';
import { interval, Subscription } from 'rxjs';

const source = interval(500);
const text = 'Your Text Here';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})



export class AppComponent {
  public UserName;
  UserName1:any;
  subscription: Subscription;
 
  constructor(private service: ServService){ }

  ngOnInit() {
    if(this.service.login!=undefined)
  {
   this.UserName=this.service.login.FirstName;
    this.UserName1=this.service.login;
    console.log("chheviUser");
  }
  
    else
    {
      this.UserName='אורח';
      this.UserName1='hghghgh';
      console.log("chheviHost");
    }
    this.subscription = source.subscribe(val => this.CheckName());

  }
  CheckName(){
    if(this.service.login!=undefined)
    {
     this.UserName=this.service.login.FirstName;
      this.UserName1=this.service.login;
      console.log("chheviUser");
    }
    
      else
      {
        this.UserName='אורח';
        this.UserName1='hghghgh';
        console.log("chheviHost");
      }
      
  }

  // onClick(event) {
  //   console.log(event);
  // }

//emit value in sequence every 10 second


ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
