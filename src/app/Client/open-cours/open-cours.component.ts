import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ServService } from '../../service/server.service';
import { OpenCours } from '../../Class/OpenCours';
import { Teacher } from 'src/app/Class/Teacher';
import { Location } from '@angular/common';

@Component({
  selector: 'app-open-cours',
  templateUrl: './open-cours.component.html',
  styleUrls: ['./open-cours.component.css','../../../../src/app/app.component.css']
})
export class OpenCoursComponent implements OnInit {

  constructor(private service: ServService, private router: Router,private location:Location) { }
  Subjects: any
  model: any;
  Different = false;
  teacher: Teacher;
  IdSubject: number;
  idd: number;
  nname: string;
  ngOnInit() {
    if(this.service.login==null)

    //בעיתי חייבים CLASS נוסף
    this.model = new OpenCours();
    this.model = this.service.login;
    this.service.GetAllSubSubject().subscribe(
      res => {
        this.Subjects = res;
        this.Subjects.forEach((element, index) => {
          sessionStorage.setItem(element.SubjectName, element.IdSubject);
          sessionStorage.setItem("SubjectName" + index, element.SubjectName);
        });

      },
      error => {
        console.log("error in get subject");
      }
    )
  }
  // LookForTeacher(){
  //   this.service.LookForTeacherS(this.model.Subject).subscribe(
  //     res=>{
  //       debugger;
  //       this.teacher=res;
  //     },
  //     err=>{
  //       debugger;
  //       console.log("error in get teacher name & price",err)
  //     }
  //   )
  //we need to continue.................
  // }
  ChooseSubject() {
    debugger;
    if (this.model.subject == "בחר נושא")
      this.model.subject = this.model.otherSubject;
    this.nname = this.model.FirstNameS;
    debugger;

    // this.IdSubject=this.model.IdSubjectS;

  }
  ChooseDay() {
    debugger;
    switch (this.model.DayInWeekC) {
      case "ראשון":
        {
          this.model.DayInWeekC = 1;
          break;
        }
      case "שני":
        {
          this.model.DayInWeekC = 2;
          break;
        }
      case "שלישי":
        {
          this.model.DayInWeekC =3;
          break;
        }
      case "רביעי":
        {
          this.model.DayInWeekC = 4;
          break;
        }
      case "חמישי":
        {
          this.model.DayInWeekC = 5;
          break;
        }

    }

  }
  ContinueOpenCours() {
    // this.LookForTeacher();
    debugger;
    this.service.model = this.model;
    debugger;
    this.model.IdSubject = sessionStorage.getItem(this.model.Subject);
    this.service.model.IdSubject = this.model.IdSubject;
    //console.log("LOokForTeacher",this.teacher)
    this.router.navigate(['ContinueOpenCours']);
    // ,this.teacher.FirstNameT
  }
  FuncBack() {
    this.location.back();
  }
}
