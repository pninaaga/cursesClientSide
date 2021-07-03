
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServService } from '../../service/server.service';
import { HeaderComponent } from '../../header/header.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../../../src/app/app.component.css']
})

export class HomeComponent implements OnInit {
  // UserName:string;
  constructor(private service:ServService,private router:Router) { }
temp:number;
  ngOnInit() {
    if(this.service.login!=undefined)
    HeaderComponent.arguments.UserName=this.service.login.FirstName
  }
  FuncContact(){
    this.router.navigate(['Contact']);
  }
  FuncOpenCours() {
    this.router.navigate(['OpenCours']);
  }
  FuncCourses() {
    this.router.navigate(['Courses']);
  }
  FuncSurveys(){
    this.router.navigate(['Surveys']);
  }
  FuncAbout(){
    this.router.navigate(['About']);
  }
}