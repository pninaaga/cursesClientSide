import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../service/TranslateService.service';
import { Router } from '@angular/router';
import { ServService } from '../service/server.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // public UserName: string;
  Strings: string[];
  language: string;
  message=false;
  displayFlag = true;
  Login:boolean;
  Logout="התנתק"
  // displayFlagUSA=false;
  constructor(private TranslateS: TranslateService, private router: Router, private service: ServService) { }

  ngOnInit() {
    this.Strings = this.TranslateS.GetSuportLang();
    this.language = this.TranslateS.GetLang();
    debugger;
    if (this.service.login == undefined)
      AppComponent.prototype.UserName = 'אורח';
    else 
    AppComponent.prototype.UserName  = this.service.login.FirstName;
 
    debugger;
    var e = this.language;
    if (this.language == 'HE')
      this.displayFlag = true;
    else
      if (this.language == 'EN')
        this.displayFlag = false;
        this.router.navigate(['Home'])
  }
  FuncTranslate(Lang: string) {
    debugger;
    this.TranslateS.SetLang(Lang);
    this.language = this.TranslateS.GetLang();

    location.reload();
  }
  homepage() {
    debugger;
    if(this.service.login!=undefined){
    if (this.service.login.MailToConnect == "furthertraining@gmail.com" && this.service.login.PasswordC == "furthertraining")
      this.router.navigate(['Manager']);
      else
      this.router.navigate(['Home']);
    }
    else
      this.router.navigate(['Home']);
  }

  // Contact() {
  //   this.router.navigate(['Contact']);
  // }
  FuncOpenCours() {
    this.router.navigate(['OpenCours']);
  }
  FuncLogin(){
    debugger;
    // newConnect=false;
    this.router.navigate(['Login']);
  }
  FuncCourses() {
    this.router.navigate(['Courses']);
  }
  FuncContact(){
    this.router.navigate(['Contact']);
  }
  FuncSurveys(){
    this.router.navigate(['Surveys']);
  }
  FuncAbout(){
    this.router.navigate(['About']);
  }
  FuncHome(){
    this.router.navigate(['Home']);
  }
  // Logout(){
  //   debugger;
  //   this.service.login=undefined;
  //   this.connect= undefined;
  //   this.UserName='אורח';
  //   this.router.navigate(['Home'])
  // }
}

