import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Teacher } from '../../Class/Teacher';
import { ServService } from '../../service/server.service';
import { Location } from '@angular/common';
import { CreateEditCoursesComponent } from '../create-edit-courses/create-edit-courses.component';

@Component({
  selector: 'app-create-edit-teacher',
  templateUrl: './create-edit-teacher.component.html',
  styleUrls: ['./create-edit-teacher.component.css', '../../../../src/app/app.component.css', '../manager.component.css']
})
export class CreateEditTeacherComponent implements OnInit {


  constructor(private Arouter: ActivatedRoute, private service: ServService, private router: Router, private location:Location) { }
  Id: number;
  model: any;
  temp: string;
  SubSubjects:string[];
  CreateCourse: string;
  Subjects: string[];
  ArrayUserSubjects:Array<number>=[];
  // UserSubject:any;
  ArrayDays:Array<number>=[];
  temp11=true;
  ngOnInit() {
    debugger;
    this.Arouter.params.subscribe((params: Params) => { this.Id = params.id, this.CreateCourse = params.CreateCourse })
    this.service.GetAllSubjects().subscribe(
      res=>{
        debugger;
        this.SubSubjects=res.filter(y=>y.IdFatherSubject!=null);
        this.Subjects=res.filter(x=>x.IdFatherSubject==null)
      },
      err=>{
        console.log("error with get sub subject",err);
      }
    )
    if (this.Id == 0) {
      debugger;
      this.model = new Teacher();
      this.temp = "Create"
    }
    else {
      this.service.GetTeacher(this.Id).subscribe(
        res => {
          debugger;
          this.model = res;
          debugger;
        },
        err => {
          debugger;
          console.log("error with get Teacher", err);
        }
      )
      this.temp = "Edit"
    }
  }
  FuncSave() {
    debugger;
    this.service.modelT = this.model;
    if (this.temp == "Create") {
      this.service.CreateTeacher(this.ArrayUserSubjects,this.model.TzT,this.ArrayDays);
      // this.service.SaveSubjectsOfTeacher(this.ArrayUserSubjects,this.model.TzT);//שמירת נושאי המורה
      debugger;
      // this.service.SaveAvaliableTeacher(this.ArrayDays,this.model.TzT);
      if (this.CreateCourse == "true") {
        // sessionStorage.setItem("")
        this.service.model.TzT=this.model.TzT;
        //  this.router.navigate(['CreateEditCourses',0,sessionStorage.getItem(this.service.model.SubjectName)]);
   this.location.back();
      }
      else {
        this.router.navigate(['ShowTeachers']);
      }
    }
    else {
      this.service.EditTeacher(this.Id).subscribe(
        res => {
          this.model = res;
        },
        err => {
          console.log("error with edit teacher");
        }
      )
      this.router.navigate(['ShowTeachers']);
    }

  }
  
  onCheckChange(event) {
    debugger;
    const formArray: Array<number> = this.ArrayUserSubjects;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(event.target.value);
    }
    /* unselected */
    else {
      // find the unselected element
      let i: number = 0;

      formArray.forEach((ctrl: number) => {
        if (ctrl == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.splice(i, 1);
          return;
        }

        i++;
      });
    }
  }
    
  onCheckChangeDays(event) {
    debugger;
    const formArray: Array<number> = this.ArrayDays;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(event.target.value);
    }
    /* unselected */
    else {
      // find the unselected element
      let i: number = 0;

      formArray.forEach((ctrl: number) => {
        if (ctrl == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.splice(i, 1);
          return;
        }

        i++;
      });
    }
  }


}
