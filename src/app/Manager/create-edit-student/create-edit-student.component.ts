import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Student } from '../../Class/Student';
import { ServService } from '../../service/server.service';

@Component({
  selector: 'app-create-edit-student',
  templateUrl: './create-edit-student.component.html',
  styleUrls: ['./create-edit-student.component.css','../../../../src/app/app.component.css','../manager.component.css']
})
export class CreateEditStudentComponent implements OnInit {

  constructor(private Arouter:ActivatedRoute,private service:ServService, private router:Router) { }
id:number;
model:Student;
  ngOnInit() {
    this.Arouter.params.subscribe((params:Params)=>this.id=params.id)
    if(this.id==0)
    this.model=new Student();
    else
    this.service.GetStudent(this.id).subscribe(
      res=>{
        this.model=res;
      },
      err=>{
        console.log("error with get Student",err);
      }
    )
  }
  FuncSave()
  {
    this.service.modelS=this.model;
    if(this.id==0){
      debugger;
    this.service.SaveStudent();
    this.router.navigate(['ShowStudents']);
    }
    else
    {
    this.service.EditStudent(this.id).subscribe(
      res=>{
        this.model=res;
      },
      err=>{
        console.log("error with edit teacher")
      }
    )
    this.router.navigate(['ShowStudents']);
  }
 
  }
}
