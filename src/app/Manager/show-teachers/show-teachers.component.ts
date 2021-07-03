import { Component, OnInit } from '@angular/core';
import { ServService } from '../../service/server.service';
import { Teacher } from '../../Class/Teacher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-teachers',
  templateUrl: './show-teachers.component.html',
  styleUrls: ['./show-teachers.component.css','../../../../src/app/app.component.css','../manager.component.css']
  // ManagerComponent
})
export class ShowTeachersComponent implements OnInit {
  Teachers:Teacher[];
  NewTeacher:Teacher;
  temp=0;
  DeleteConfirm:number;
  loader=false;
  constructor(private service:ServService, private router:Router) { }
  ngOnInit() {
    this.loader=true;
    this.service.GetAllTeachers().subscribe(
     
      res=>{
        debugger;
        this.Teachers=res;
        this.loader=false;
      
      },
      err=>{
        console.log("error with get all teachers",err);
        this.loader=false;
      }
    )
  }
  CreateEditTeacher(id:number)
  {
     this.router.navigate(['CreateEditTeacher',id,false]);
  }

  DeleteTeacher(id:number)
  {
    this.DeleteConfirm=id;
    document.getElementById('DeleteConfirmId').style.display='flex';
  }
  OkDeleteTeacher(){
    debugger;
    this.loader=true;
    debugger;
    this.service.DeleteTeacher(this.DeleteConfirm).subscribe(
      res=>{
        debugger;
        if(res==null)
        document.getElementById('DeleteConfirmError').style.display='flex';
        else{
          document.getElementById('DeleteConfirmId').style.display='none';
          location.reload();
          this.Teachers=res;
        }
        this.loader=false;
     
      },
      err=>{
        debugger;
        this.loader=false;
        console.log("error with delete teacher",err);
        document.getElementById('DeleteConfirmId').style.display='none';
      }
    )
    
   
  }
  CancelDeleteTeacher(){
   document.getElementById('DeleteConfirmId').style.display='none';
   document.getElementById('DeleteConfirmError').style.display='none';
  }
  SearchT()
   {
     debugger;
      var input, filter, table, tr, td1,td2,td3, i, txtValue1,txtValue2, txtValue3,j;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("TeachersTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
            td1 = tr[i].getElementsByTagName("td")[0];
            td2= tr[i].getElementsByTagName("td")[1];
            td3= tr[i].getElementsByTagName("td")[2];
        if (td1 ||td2|| td3) {
          txtValue1 = td1.textContent || td1.innerText;
          txtValue2 = td2.textContent || td2.innerText;
          txtValue3 = td3.textContent || td3.innerText;
          if (txtValue1.toUpperCase().indexOf(filter) > -1||txtValue2.toUpperCase().indexOf(filter) > -1 || txtValue3.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
    }
}
