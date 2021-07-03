import { Component, OnInit } from '@angular/core';
import { Course } from '../../Class/Course';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServService } from '../../service/server.service';
import { Teacher } from 'src/app/Class/Teacher';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-create-edit-courses',
  templateUrl: './create-edit-courses.component.html',
  styleUrls: ['./create-edit-courses.component.css', '../../../../src/app/app.component.css', '../manager.component.css']
})
export class CreateEditCoursesComponent implements OnInit {

  constructor(private Arouter: ActivatedRoute, private service: ServService, private router: Router) { }
  model: any;
  id: number;
  IdSubject: number;
  // Teachers:Teacher[];
  // GetFatherSubject:false;
  TeachersShow: Teacher[];
  Subject: any;
  TeachersSelect: Teacher[];
  TeachersAndSubjects: any;
  FatherSubject = null;
  Teachers: Array<Teacher> = [];
  ShowTeachers = false;
  ShowOtherSubject = false;
  otherSubject = false;
  GetFatherSubject = false;


  ngOnInit() {
    debugger;

    this.Arouter.params.subscribe((params: Params) => { this.id = params.id, this.IdSubject = params.idSubject });
    if (this.service.model != null) {
      debugger;
      this.model = this.service.model;
       this.id = -2 //חזור מצור מורה...    
    }
    if (this.id == 0)
      this.IdSubject = -1;//
    // this.Arouter.params.subscribe((params:Params)=>this.id=params.id)

    this.service.GetSubjects(this.IdSubject).subscribe(
      res => {
        debugger;
        this.TeachersAndSubjects = res;
        this.Subject = this.TeachersAndSubjects[0][0];
        this.Subject.forEach((element, index) => {
          debugger;
          sessionStorage.setItem(element.SubjectName, element.IdSubject);
          sessionStorage.setItem("SubjectName" + index, element.SubjectName);
        });
        var i = 0;
        for (i = 0; i < this.TeachersAndSubjects[1].length; i++)
        {
          debugger;
          this.Teachers.push(this.TeachersAndSubjects[1][i]);
        }
        // for(var i=0;i<this.Teachers.length;i++)
        this.Teachers.forEach(element => {
          sessionStorage.setItem(`(${element.TzT})`, element.IdTeacher.toString());
        });
        // this.TeachersShow[i]=new Teacher();
        // this.TeachersShow[i]=this.TeachersAndSubjects[1][i];

      },
      err => {
        debugger;
        console.log("error with get teachers", err)
      }
    )
    if (this.id == 0) {
      this.model = new Course();
    }
    else {
      this.service.GetCourse(this.id).subscribe(
        res => {
          debugger;
          this.model = res;
        },
        err => {
          console.log("error with edit courses", err);
        }
      )
    }

  }
  ChangeCourse(SubjectName: string) {
    this.ShowOtherSubject = false;
    this.GetFatherSubject = false;
    this.ShowTeachers = true;
    this.Teachers = [];
    debugger;
    var id = sessionStorage.getItem(SubjectName)
    for (var i = 0; i < this.TeachersAndSubjects[1].length; i++)
      if (this.TeachersAndSubjects[1][i][0].IdSubject == id)
        this.Teachers.push(this.TeachersAndSubjects[1][i][0]);
    if (this.Teachers.length <= 0) {
      this.otherSubject = true;
      this.ShowTeachers = false;
    }
  }
  GetFatherSubjectFunc(GetFatherSubject) {
    this.ShowTeachers = false;
    debugger;
    if (this.FatherSubject == null)
      this.service.GetAllSubject().subscribe(
        res => {
          debugger;
          this.FatherSubject = res;
        },
        err => {
          console.log("error with edit courses", err);
        }
      )
  }
  FuncSave() {
    debugger;
    this.service.modelC = this.model;
    if(this.model.TzT){
    var t = this.model.TzT;
    var AmountSpace = 0;
    for (var i = 0; i < this.model.TzT.length; i++) {
      if (this.model.TzT[i] == ' ')
        AmountSpace++;
    }
    this.service.modelC.IdTeacher = Number(sessionStorage.getItem(this.model.TzT.split(' ')[AmountSpace]));
  }
  this.service.modelC.IdSubject = Number(sessionStorage.getItem(this.model.SubjectName));
    if(this.id == -2){
      // this.service.model=this.model;
      this.service.model.TzT=this.model.TzT;
      // if (this.service.modelC.IdSubject == undefined) 
      this.service.model.SubjectName=this.model.SubjectName;
      if(this.model.FatherSubject!=undefined)
      this.service.model.FatherSubject=this.model.FatherSubject;
      this.service.CreateCourseWithNewSubjects();
    }
    if (this.id == 0)
      // if(this.model.FatherSubject==)
      this.service.CreateCourses();
    else
      this.service.EditCourse(this.id).subscribe(
        res => { },
        err => { }
      )
    this.router.navigate(['ShowCourses']);
  }
  CreateTeacherOfCreateCourse() {
    debugger;
    // sessionStorage.setItem("fatherSubject",this.model.FatherSubject);
    // sessionStorage.setItem("Subject",this.model.SubjectName); 
    this.service.model = this.model;

    this.router.navigate(['CreateEditTeacher', 0, true]);
  }
}
