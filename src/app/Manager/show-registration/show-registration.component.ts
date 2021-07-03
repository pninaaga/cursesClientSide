import { Component, OnInit } from '@angular/core';
import { Registration } from '../../Class/Registration';
import { ServService } from '../../service/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-registration',
  templateUrl: './show-registration.component.html',
  styleUrls: ['./show-registration.component.css', '../../../../src/app/app.component.css', '../manager.component.css']
})
export class ShowRegistrationComponent implements OnInit {

  Registrations: Registration[];
  constructor(private service: ServService, private router: Router) { }
  DeleteConfirm: number;
  loader = false;
  ngOnInit() {
    this.loader = true;
    this.service.GetRegistrations().subscribe(
      res => {
        this.Registrations = res;
        this.loader = false;
      },
      err => {
        console.log("error output registrations", err);
        this.loader = false;
      }
    )
  }
  DeleteRegistration(id: number) {
    this.DeleteConfirm = id;
    debugger;
    document.getElementById('DeleteConfirmId').style.display = 'flex';
  }
  OkDeleteRegistration() {
    this.loader = true;
    this.service.DeleteRegistration(this.DeleteConfirm).subscribe(
      res => {
        this.loader = false;
        this.Registrations = res;
      },
      err => {
        this.loader = false;
        console.log("error with delete registration", err);
      }
    )
    location.reload();
    document.getElementById('DeleteConfirmId').style.display = 'none';
  }
  CancelDeleteRegistration() {
    document.getElementById('DeleteConfirmId').style.display = 'none';
  }
  SearchR() {
    debugger;
    var input, filter, table, tr, td1, td2, td3, td4, td5, td6, td7, i, txtValue1, txtValue2, txtValue3, txtValue4, txtValue5, txtValue6, txtValue7, j;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("RegistrationTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td1 = tr[i].getElementsByTagName("td")[0];
      td2 = tr[i].getElementsByTagName("td")[1];
      td3 = tr[i].getElementsByTagName("td")[2];
      td4 = tr[i].getElementsByTagName("td")[3];
      td5 = tr[i].getElementsByTagName("td")[4];
      td6 = tr[i].getElementsByTagName("td")[5];
      td7 = tr[i].getElementsByTagName("td")[6];
      if (td1 || td2 || td3 || td4 || td5 || td6 || td7) {
        txtValue1 = td1.textContent || td1.innerText;
        txtValue2 = td2.textContent || td2.innerText;
        txtValue3 = td3.textContent || td3.innerText;
        txtValue4 = td4.textContent || td4.innerText;
        txtValue5 = td5.textContent || td5.innerText;
        txtValue6 = td6.textContent || td6.innerText;
        txtValue7 = td7.textContent || td7.innerText;

        if (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1 ||
          txtValue3.toUpperCase().indexOf(filter) > -1 || txtValue4.toUpperCase().indexOf(filter) > -1 ||
          txtValue5.toUpperCase().indexOf(filter) > -1 || txtValue6.toUpperCase().indexOf(filter) > -1 || txtValue7.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}


