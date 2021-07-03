import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../service/TranslateService.service';
import { Router } from '@angular/router';
import { ServService } from '../service/server.service';
import { timingSafeEqual } from 'crypto';


@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css','./../../../src/app/app.component.css']
})
export class TranslateComponent implements OnInit {
  //  Strings:string[];
   Menu=false;
  //  language:string;
  //  displayFlagIL=true;
  //  displayFlagUSA=false;
   constructor(private TranslateS:TranslateService,private service:ServService,private router:Router){}
   ngOnInit(){
      // this.Strings=this.TranslateS.GetSuportLang();
      //  this.language=this.TranslateS.GetLang();
    }
  //  FuncTranslate(Lang:string){
  //    debugger;
  //   this.TranslateS.SetLang(Lang);
  //   this.language=this.TranslateS.GetLang();   
  //   location.reload();
  //  }

  // FuncManager()
  // {
  //   this.router.navigate(['Manager']);
  // }
FuncShow(){
  debugger;
  if(this.service.login.MailToConnect=="furthertraining@gmail.com" && this.service.login.PasswordC=="furthertraining")
  this.router.navigate(['Manager']);
  else
  this.router.navigate(['Home']);
}

}

