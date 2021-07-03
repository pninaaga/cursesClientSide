import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/Class/Student';
import { ServService } from 'src/app/service/server.service';
import { Registration } from 'src/app/Class/Registration';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css','../../../../src/app/app.component.css']
})
export class PaymentComponent implements OnInit {
fromWhere:string;
  constructor(private service:ServService, private router:Router,private Arouter:ActivatedRoute) { }
  modelStudent:Student;
  ngOnInit() {
    this.Arouter.params.subscribe((params: Params) =>  this.fromWhere = params.fromWhere );
    this.modelStudent= this.service.model;
  }
  SaveForm(){
    debugger;
    if(this.fromWhere=="registration")
    //כשמגיע לכאן מרישום רגיל לקורס
    this.router.navigate(['SuccessRegistration']);
  // this.service.modelC.IdSubject=3;

  //     this.service.modelC=this.modelStudent;
 
  ///           כשמגיע מפתיחת קורס
  else{
  this.service.model=this.modelStudent;
  this.service.modelR=new Registration();
      this.service.CreateOpenCourses();
      debugger;
    //   setTimeout(() => {
    //     this.service.CreateStudentOpenCourse();

    //   }, 1000);
    //   setTimeout(()=>{
    //   this.service.SendParamterToStudentRegistrations().subscribe(
    //     res=>{
    //       debugger;
    //       console.log("res",res)
    //     },
    //     err=>{
    //       debugger;
    //      console.log("error SendParamterToStudentRegistrations",err)
    //     }
    //   );
    // },1000);
      
  }
}
}
