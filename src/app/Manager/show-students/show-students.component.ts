import { Component, OnInit } from '@angular/core';
import { ServService } from '../../service/server.service';
import { Student } from '../../Class/Student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
  styleUrls: ['./show-students.component.css', '../../../../src/app/app.component.css','../manager.component.css']
})
export class ShowStudentsComponent implements OnInit {
  Students: Student[];
  constructor(private service: ServService, private router: Router) { }
  DeleteConfirm: number;
  loader=false;
  ngOnInit() {
    this.loader=true;
    this.service.GetAllStudents().subscribe(
      res => {
        this.Students = res;
        this.loader=false;
      },
      err => {
        console.log("error output students", err);
        this.loader=false;
      }
    )
  }
  CreateEditStudent(id: number) {
    this.router.navigate(['CreateEditStudent', id]);
  }
  DeleteStudent(id: number) {
    this.DeleteConfirm = id;
    debugger;
    document.getElementById('DeleteConfirmId').style.display = 'flex';
  }
  OkDeleteStudent() {
    this.loader=true;
    this.service.DeleteStudent(this.DeleteConfirm).subscribe(
      res => {
        this.loader=false;
        this.Students = res;
      },
      err => {
        this.loader=false;
        console.log("error with delete student", err);
      }
    )
    location.reload();
    document.getElementById('DeleteConfirmId').style.display = 'none';
  }
  CancelDeleteStudent() {
    document.getElementById('DeleteConfirmId').style.display = 'none';
  }
  SearchS() {
    debugger;
    var input, filter, table, tr, td1, td2, td3, td4, i, txtValue1, txtValue2, txtValue3, txtValue4, j;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("StudentsTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td1 = tr[i].getElementsByTagName("td")[0];
      td2 = tr[i].getElementsByTagName("td")[1];
      td3 = tr[i].getElementsByTagName("td")[2];
      td4 = tr[i].getElementsByTagName("td")[3];
      if (td1 || td2 || td3 || td4) {
        txtValue1 = td1.textContent || td1.innerText;
        txtValue2 = td2.textContent || td2.innerText;
        txtValue3 = td3.textContent || td3.innerText;
        txtValue4 = td4.textContent || td4.innerText;

        if (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1 || txtValue3.toUpperCase().indexOf(filter) > -1 || txtValue4.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}
