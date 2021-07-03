import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Details } from '../../Class/Details';
import { ServService } from '../../service/server.service';
import { Teacher } from 'src/app/Class/Teacher';
import { Course } from '../../Class/Course';


@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css','../../../../src/app/app.component.css']
})
export class MoreDetailsComponent implements OnInit {
details:any;
OpenCoursString:String;
teacher:Teacher;
  constructor(private service:ServService) { }
@Input() idd:number;
//@Output() tempMoreDetails=new EventEmitter<boolean>();
  ngOnInit() {
    

this.service.GetAllDetails(this.idd).subscribe(
  res=>{
    debugger;
    this.details=res;
    if(this.details.OpenCourse===false)
    this.OpenCoursString="הקורס עדיין לא נפתח";
    else
    this.OpenCoursString="הקורס פתוח";
  },
  err=>{
    debugger;
console.log("error output more details",err)
  }
)
this.service.GetTeacher(1).subscribe(
  res=>{
    this.teacher=res;
  },
  err=>{
    console.log("error with get teacher",err)
  }
)
//this.tempMoreDetails.emit(false);
  }

}
