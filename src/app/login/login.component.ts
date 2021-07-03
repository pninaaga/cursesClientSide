import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { ServService } from '../service/server.service';
import { Connect } from '../Class/Connect';
import { $ } from 'protractor';
import { TranslateService } from '../service/TranslateService.service';
import { HeaderComponent } from '../header/header.component';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../../../src/app/app.component.css']
})
export class LoginComponent implements OnInit {
  connect: Connect;
  newConnect: boolean;
  DisplayError = false;
  DisplayErrorNewConnect = false;
  errorEditDetails = false;
  // UserName: string;
  Strings: string[];
  language: string;
  message=false;
  displayFlag = true;
  edit:Boolean;
  mail:string;
  // editDetails=false;
  rand:number;
  strRand:string;
  tavActive=true;
  typeRegister:string;
  successConnect=false;
  successRegister=false;
  Login:boolean;
  successEditProfile=false;
  regToSite:number;
  // displayFlagUSA=false;
  constructor(private TranslateS: TranslateService, private router: Router, private service: ServService,private Arouter:ActivatedRoute) { }

  ngOnInit() {
    debugger;
    this.Arouter.params.subscribe((params: Params) => { this.regToSite = params.regToSite });
    if(this.regToSite==1)//רישום לאתר דרך צפיה בקורסים
    this.tavActive=true;
    else
    if(this.regToSite==2)//התחברות לאתר דרך צפיה בקורסים
    this.tavActive=false;
    this.Strings = this.TranslateS.GetSuportLang();
    this.language = this.TranslateS.GetLang();
    debugger;
    this.connect = new Connect();
    debugger;
   this.service.login!=undefined ?  this.Login=true :  this.Login=false;
    if (this.service.login == undefined)
      AppComponent.prototype.UserName = 'אורח';
    else 
      AppComponent.prototype.UserName = this.service.login.FirstName;
    
    debugger;
    var e = this.language;
    if (this.language == 'HE')
      this.displayFlag = true;
    else
      if (this.language == 'EN')
        this.displayFlag = false;
  }
  FuncTranslate(Lang: string) {
    debugger;
    this.TranslateS.SetLang(Lang);
    this.language = this.TranslateS.GetLang();

    location.reload();
  }
  homepage() {
    debugger;
    if (this.service.login.MailToConnect == "furthertraining@gmail.com" && this.service.login.PasswordC == "furthertraining")
      this.router.navigate(['Manager']);
    else
      this.router.navigate(['Home']);
  }
  Contact() {
    this.router.navigate(['Contact']);
  }
  Edit() {//שליפת פרטי המשתמש לעריכה
    debugger;
      // this.newConnect = true;
      this.edit=true;
      this.connect=this.service.login;
            this.service.EditConnect(this.connect).subscribe(
        res => {
          debugger;
          this.connect = res;
          // this.edit=false;
          this.successEditProfile=true
        },
        err => {
          console.log("error with get Teacher", err);
        })
    }
  
  CloseConnect() {
    document.getElementById('id01').style.display = 'none';
    this.DisplayError = false;
    this.errorEditDetails = false;
    this.successConnect=false;
    this.router.navigate(['Home']);
  }
  ClosesuccessEditProfile() {
    document.getElementById('id01').style.display = 'none';
    this.DisplayError = false;
    this.errorEditDetails = false;
    this.successEditProfile=false; 
    this.router.navigate(['Home']);
  }
  FuncOpenCours() {
    this.router.navigate(['OpenCours']);
  }
  FuncCourses() {
    this.router.navigate(['Courses']);
  }
  forgetPassword()
  {
    debugger
    this.message=true
    // console.log(']]]]]]]]]]',this.mail)
    // // יש לברר איך לעשות ראנד
    // this.rand=1234;
    // this.strRand='/ '+this.rand
   this.service.mail()
     .subscribe((sucsses)=>{
    },
    (error)=>
    {
       console.log('error',error);
    });
  }
  Logout(){
    debugger;
    this.service.login=undefined;
    this.connect= undefined;
    AppComponent.prototype.UserName='אורח';
    this.router.navigate(['Home'])
  }
  ConnectToSite(edit) {
    debugger;
    this.service.login = this.connect;
    this.errorEditDetails = false;
    this.DisplayError = false;
    // this.DisplayErrorNewConnect=false;
    // this.service.GetLoginPerson().
    if (this.edit == undefined) {
      if (this.connect.MailToConnect == 'furthertraining@gmail.com' && this.connect.PasswordC == 'furthertraining') {
        AppComponent.prototype.UserName= 'מנהל';
        this.router.navigate(['Manager']);
        this.service.login = this.connect;
        // return;
      }
      
      // this.service.GetLoginPerson().subscribe(
      //   res => {
      //     debugger;
      //     this.service.login = res;
      //     this.UserName = this.service.login.FirstName;
      //   },
      //   err => {
      //     document.getElementById('id01').style.display = 'block';
      //     this.newConnect = true;
      //     this.DisplayErrorNewConnect = true;
      //     console.log(err)
      //   }
      // );
    }
    else {
      debugger;
      if(edit===true){
      // this.service.EditConnect(this.connect).subscribe(
      //   res => {
      //     this.connect = res;
      //     this.edit
      //   },
      //   err => {
      //     console.log("error with get Teacher", err);
      //   })
        this.tavActive=false
        this.edit=true
      }
      else
      {
      this.service.CreateNewConnect().subscribe(
        res => {
          debugger;
          this.DisplayError = false;
          this.DisplayErrorNewConnect=false;
          this.successConnect=true;
          console.log(this.service.login.FirstName)
         },
        err => {
          debugger;
          console.log("error in create connect");
          document.getElementById('id01').style.display = 'block';
          this.DisplayError = true;
          debugger;

        }
      );
    }
     this.service.login = this.connect;

      // this.errorEditDetails=false;
      // this.DisplayError=false;

    }
    if (this.connect.MailToConnect != 'furthertraining@gmail.com' && this.connect.PasswordC != 'furthertraining') 
      this.service.GetLoginPerson().subscribe(
      res => {
        debugger;
        if(edit!=true)
        this.successConnect=true;
        this.service.login = res;
        this.connect=res;
        debugger;
        AppComponent.prototype.UserName1=this.service.login.FirstName;
        AppComponent.prototype.UserName = this.service.login.FirstName;
      },
      err => {
        document.getElementById('id01').style.display = 'block';
        this.newConnect = true;
        this.DisplayErrorNewConnect = true;
        console.log(err)
      }
    );
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
}
