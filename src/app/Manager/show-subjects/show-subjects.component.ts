import { Component, OnInit } from '@angular/core';
import { Subject } from '../../Class/Subject';
import { Router } from '@angular/router';
import { ServService } from '../../service/server.service';

@Component({
  selector: 'app-show-subjects',
  templateUrl: './show-subjects.component.html',
  styleUrls: ['./show-subjects.component.css', '../../../../src/app/app.component.css','../manager.component.css']
})
export class ShowSubjectsComponent implements OnInit {
  DeleteConfirm: number;
//  SubjectNameDelete:string;
  errorDeleteCategory=false;
  Subjects: any[];
  FatherToDelete:any[];
  loader = false;
  constructor(private service: ServService, private router: Router) { }
  ngOnInit() {
    this.service.AllSubjects=new Subject()[""];
    this.loader = true;
    this.service.GetAllSubjects().subscribe(
      res => {
        debugger;
        this.Subjects = res;
        this.loader = false;
         this.service.AllSubjects= res.filter(x=>x.IdFatherSubject==null);
         this.service.AllSubSubjects=res.filter(x=>x.IdFatherSubject!=null);
      },
      err => {
        console.log("error output subjects", err);
        this.loader = false;
      }
    )
  }
  CreateEditSubject(id: number) {
    debugger;
    this.router.navigate(['CreateEditSubject', id]);
  }
  DeleteSubject(id: number) {
    this.DeleteConfirm = id;
    // this.SubjectNameDelete=SubjectNameDelete;
    debugger;
    document.getElementById('DeleteConfirmId').style.display = 'flex';
  }
  OkDeleteSubject() {
    // this.loader = true;
    debugger;
    // if((this.service.AllSubSubjects.filter(SubSubject=>SubSubject.SubjectNameFather==this.SubjectNameDelete))!=undefined)
    if((this.service.AllSubSubjects.filter(SubSubject=>SubSubject.IdFatherSubject==this.DeleteConfirm).length)!=0)
    {
        this.errorDeleteCategory=true;
    }
    else{
    this.service.DeleteSubject(this.DeleteConfirm).subscribe(
      res => {
        this.loader = false;
        this.Subjects = res;
      },
      err => {
        this.loader = false;
        console.log("error with delete subject", err);
      }
    )
    location.reload();
  }

    document.getElementById('DeleteConfirmId').style.display = 'none';
  }
  CancelDeleteSubject() {
    document.getElementById('DeleteConfirmId').style.display = 'none';
  }
  SearchS() {
    debugger;
    var input, filter, table, tr, td1, td2, td3, i, txtValue1, txtValue2, txtValue3, j;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("SubjectsTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td1 = tr[i].getElementsByTagName("td")[0];
      td2 = tr[i].getElementsByTagName("td")[1];
      td3 = tr[i].getElementsByTagName("td")[2];
     
      if (td1 || td2 || td3 ) {
        txtValue1 = td1.textContent || td1.innerText;
        txtValue2 = td2.textContent || td2.innerText;
        txtValue3 = td3.textContent || td3.innerText;
       

        if (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1 || txtValue3.toUpperCase().indexOf(filter) > -1 ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}


