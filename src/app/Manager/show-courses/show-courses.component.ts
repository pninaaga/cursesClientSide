import { Component, OnInit } from '@angular/core';
import { ServService } from '../../service/server.service';
import { Course } from '../../Class/Course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-courses',
  templateUrl: './show-courses.component.html',
  styleUrls: ['./show-courses.component.css','../../../../src/app/app.component.css','../manager.component.css']
})
export class ShowCoursesComponent implements OnInit {
  ModelCourses:Course;
  DeleteConfirm:number;
  loader=false;
  constructor(private service:ServService,private router:Router ) { }

  ngOnInit() {
    debugger;
    this.loader=true;
    this.service.GetCourses().subscribe(
      res=>{
        this.ModelCourses=res;
        this.loader=false;
      },
      err=>{
        console.log("error with get courses",err);  
        this.loader=false;
      }
    )
   }
   CreateEditCourses(id:number,idSubject:number)
   {
     debugger;
     this.router.navigate(['CreateEditCourses',id,idSubject]);
    //  if(idS!=0)
    //  sessionStorage.setItem("SubjectName",idS);
   }
   
   SearchC()
   {
     debugger;
      var input, filter, table, tr, td1,td2,td3, i, txtValue1,txtValue2, txtValue3,j;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("CoursesTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
            td1 = tr[i].getElementsByTagName("td")[0];
            td2=tr[i].getElementsByTagName("td")[1];
            td3= tr[i].getElementsByTagName("td")[2];
        if (td1 || td2|| td3) {
          txtValue1 = td1.textContent || td1.innerText;
          txtValue2 =td2.textContent || td2.innerText;
          txtValue3 = td3.textContent || td3.innerText;
          if (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue3.toUpperCase().indexOf(filter) > -1|| txtValue2.toUpperCase().indexOf(filter)>-1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
    }
  
    //  this.service.SearchC(text).subscribe(
    //    res=>{ 
    //      console.log("res",res);
    //    },
    //    err=>{
    //     console.log("err",err);
    //    }
    //  )
   
   DeleteCourse(id:number)
  {
    this.DeleteConfirm=id;
    debugger;
    document.getElementById('DeleteConfirmId').style.display='flex';
  }
  OkDeleteCourse(){
    this.loader=true;
    this.service.DeleteCourse(this.DeleteConfirm).subscribe(
      res=>{
        this.ModelCourses=res;
        this.loader=false;
      },
      err=>{
        console.log("error with delete course",err);
        this.loader=false;
      }
    )
    location.reload();
    document.getElementById('DeleteConfirmId').style.display='none';
  }
  CancelDeleteCourse(){
   document.getElementById('DeleteConfirmId').style.display='none';
  }
  }


