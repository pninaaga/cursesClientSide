import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css', './../../../src/app/app.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  ShowData(temp: number) {
    if (temp === 1)
      this.router.navigate(['ShowCourses']);
    else
      if (temp === 2)
        this.router.navigate(['ShowTeachers']);
      else
        if (temp === 3)
          this.router.navigate(['ShowStudents']);
        else
          if (temp === 4)
            this.router.navigate(['ShowSubjects']);
          else
            this.router.navigate(['ShowRegistration']);
  }

}
