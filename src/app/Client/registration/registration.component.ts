import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Student } from '../../Class/Student';
import { ServService } from 'src/app/service/server.service';
import { Registration } from 'src/app/Class/Registration';
import { DatePipe } from '@angular/common';
import { toDate } from '@angular/common/src/i18n/format_date';
import { isDate } from 'util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Location } from '@angular/common';
import { SyncAsync } from '@angular/compiler/src/util';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../../../../src/app/app.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private service: ServService, private router: Router, private Arouter: ActivatedRoute, private location: Location) { }
  IdCourse: number;
  CoursName: string;
  model: Student = new Student();
  modelRegistration: Registration = new Registration();
  AlreadyRegistered = false;
  FullCourse = false;
  ShowPopup = false;
  SuccessRegistration = true;

  ngOnInit() {
    this.Arouter.params.subscribe((params: Params) => { this.CoursName = params.name, this.IdCourse = params.id });
    this.model = new Student();
    this.model.FirstNameS = this.service.login.FirstName;
    this.model.LastNameS = this.service.login.LastName;
    this.model.EmailS = this.service.login.MailToConnect;
    this.model.PhoneS = this.service.login.Phone;
    this.model.TzS = this.service.login.Tz;


  }
  FuncSave() {
    debugger;
    this.service.modelS = this.model;
    //this.service.SaveStudent();

    this.modelRegistration.RegistrationDate = new Date();
    this.modelRegistration.IdCourse = this.IdCourse;
    //this.modelRegistration.IdStudent=5;
    this.service.model = this.modelRegistration;
    this.service.model.Address = this.model.AddressS;
    // this.service.CreateStudentOpenCourse();//לא הבנו מתי משתמשים בזה...
    
    this.service.RegistrationsStudent().subscribe(
      res => {
        debugger;
        console.log("fgvbhnjjjjjjjjjjjjjjjjjj", res)
        if (res._body == -1) {
          debugger;
            console.log("הקורס מלא");
            this.FullCourse = true;
            this.ShowPopup = true;
            this.SuccessRegistration = false;
          
        }
        else
          if (res._body == -2) {
            console.log("הינך כבר רשומה לקורס זה");
            this.AlreadyRegistered = true;
            this.ShowPopup = true;
            console.log("gffgfgfg");
            this.SuccessRegistration = false;
          }
        // else
          // this.router.navigate(['payment']);//לא היה נכנס לפה העברתי מקום
      },
      err => {
        console.log("error get min student", err);
        // this.router.navigate(['SuccessRegistration']);
      },
    );
    debugger;
    setTimeout(()=>{
    if (this.SuccessRegistration == true)
      this.router.navigate(['payment',"registration"]);
    }, 1500);
  }
  FuncBack() {
    debugger;
    this.location.back();
    // this.router.navigate(['Subject'])
  }
  CancelPopup() {
    this.ShowPopup = false;
    this.FullCourse = false;
    this.AlreadyRegistered = false;
  }
  OkPopup() {
    this.ShowPopup = false;
    this.FullCourse = false;
    this.AlreadyRegistered = false;
  }
}
