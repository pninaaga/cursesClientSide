import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServService } from '../../service/server.service';
import { Course } from '../../Class/Course';
import { Subject } from '../../Class/Subject';
import { t } from '@angular/core/src/render3';
import { $ } from 'protractor';



@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css','../../../../src/app/app.component.css']
})
export class ShowComponent implements OnInit {
  DisplyOrHiddenDetails = "MoreDetails";
  show: any;
  idd: number;
  p: number=null;
  t = false;
  public show1:boolean = false;
  public buttonName:any = 'Show';
  // private toggle : boolean = false;
  private status : boolean = false;
  ShowDetails = true;
  @Input() temp: number;
  @Input() id: number;
  tempMoreDetails=false;
  show12:boolean;
  hoverLogin=false;
  Login=false;
  ShowPopupErrorRegistration=false;
  @Output() father = new EventEmitter<number>();
  constructor(private service: ServService, private router: Router) { }

  ngOnInit() {
    this.show12=!this.show12;
    if (this.temp === 1) {
      this.service.GetAllSubject().subscribe(
        res => {
          debugger;
          this.show = res;
        },
        error => {
          console.log("error from get subject", error);
        }
      );
    }
    else
      if (this.temp === 2) {
        debugger;
        if( this.service.login===undefined){
            this.hoverLogin=false;
            this.Login=false;
        }
        else{
          this.Login=true;
        }
        this.service.GetSubSubject(this.id).subscribe(
          res => {
            debugger;
            this.show = res;
            // this.show=this.show.filter(x=>x.===this.id)
          },
          err => {
            console.log("error from get Subsubject", err);
          },
        );
      }
  }
  Func(id: number) {
    this.router.navigate(['subDetails',id]);
  }
  CancelDeleteStudent(){
    this.ShowPopupErrorRegistration=false;
  }
  OkDeleteStudent(){
    this.ShowPopupErrorRegistration=false;
  }
  FuncRegistration(name: string,id:number) {
    debugger;
    if(this.service.login!=undefined)
    this.router.navigate(['Registration', name,id]);
    else{
      this.ShowPopupErrorRegistration=true;
    }
  }
  
  FuncClick(id: number,show11:any) {
    debugger;
    show11=!show11;
    // if(this.p==id ! this.p!=null)
    // this.tempMoreDetails=!this.tempMoreDetails;
    this.p = id;
   // this.DisplyOrHiddenDetails="Hidden";
  }
  ConnectToSite(regToSite:number){
    debugger;
    this.router.navigate(['Login',regToSite]);
  }

  // funcmoredet(show12:boolean,id:number)
  // {
  // //  show12 = !show12;
  // //  this.p=id;
  //   function(){
  //     $(this)
  //   }
  // }
  func(){
    
  }
}


