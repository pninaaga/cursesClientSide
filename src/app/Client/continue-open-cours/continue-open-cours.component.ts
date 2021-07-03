import { Component, OnInit } from '@angular/core';
import { ServService } from '../../service/server.service';
import { Subject } from 'src/app/Class/Subject';
import { Route, Params, ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Class/Course';
import { Location } from '@angular/common';


@Component({
  selector: 'app-continue-open-cours',
  templateUrl: './continue-open-cours.component.html',
  styleUrls: ['./continue-open-cours.component.css','../../../../src/app/app.component.css']
})
export class ContinueOpenCoursComponent implements OnInit {
  managerConfirm=true;
modelStudent:any;
SumPrice:number;
teacher:number;
ShowPopup=false;
ThereIsCours=false;
ShowContinueCours=false;
AllDetailsForOpenCoursComponent:any;
  constructor(private service:ServService,private router:Router,private Arouter:ActivatedRoute,private location:Location) { }

  ngOnInit() {
    debugger;
    this.modelStudent= this.service.model;
    // this.Arouter.params.subscribe((params:Params)=>this.teacher=params.id);
    this.service.model.Subject=this.modelStudent.Subject;
    this.service.GetDetailsForOpenCoursComponent().subscribe(
      res=>{
        debugger;
        if(res==0)
        this.managerConfirm=false;
        else
        if(res==-1)
        {
          this.ShowContinueCours=false;
          this.ShowPopup = true;
        this.ThereIsCours=true;
        console.log("יש קורס קיים");
      }
        else{
          debugger;
        this.AllDetailsForOpenCoursComponent=res;
        this.SumPrice= res.AmountHour*(res.PricePerHour);
        this.ShowContinueCours=true;
      }
      },
      err=>{
        debugger;
        console.log("error get AllDetailsForOpenCoursComponent",err)
      }
    );
  
   this.modelStudent.MinStudent=0;
  //  this.service.GetMinStudent(this.modelStudent.Subject).subscribe(
  //   res=>{
  //     this.modelStudent.MinStudent=res;
  //   },
  //   err=>{
  // console.log("error get min student",err)
  //   }
  // );
    }
    FuncChange(){
      this.location.back();
    }
    FuncBack(){
      this.router.navigate(['Subject'])
    }
    temp:Course;
    SaveForm(){
      debugger;
      this.service.modelC=new Course();
      this.service.model.subjectName=this.modelStudent.Subject;
      this.service.model.PricePerHour=this.AllDetailsForOpenCoursComponent.PricePerHour;
      this.service.model.AmountHour=this.modelStudent.AmountHour;
    //       this.service.modelC.AmountHour=12;
    //       this.service.modelC.IdSubject=3;
    //       this.service.modelC.DayInWeekC=2;
    //       this.service.modelC.FromHourC="20:00";
          // this.service.modelC.IdTeacher=1;      
    //       this.service.modelC.IdTypeCourse=1;
    //       this.service.modelC.MaxStudents=15;
    //       this.service.modelC.MinStudents=5;
    //       this.service.modelC.OpenCourse=0;
    //       this.service.modelC.PricePerHour=5;
    //       this.service.modelC.UntilHourC="21:00";
    // this.service.modelC=this.temp;
    
    
          this.service.modelC=this.modelStudent;
          // this.service.RegistrationsStudent()
          this.service.modelS=this.modelStudent;
          // this.service.CreateCourses();
          this.service.modelC=this.AllDetailsForOpenCoursComponent;
          // this.service.modelC.IdSubject=this.AllDetailsForOpenCoursComponent.IdSubject;
          // this.service.modelC.IdSubject=this.AllDetailsForOpenCoursComponent.MinStudents;

      this.router.navigate(['payment',"openCours"]);
    }
    CancelPopup() {
      this.ShowPopup = false;
     this.ThereIsCours=false;
    }
    OkPopup() {
      this.ShowPopup = false;
      this.ThereIsCours=false;
    }

   
}
