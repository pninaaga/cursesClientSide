
import { Component, OnInit } from '@angular/core';
import { ServService } from '../service/server.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', './../../../src/app/app.component.css']
})
export class ContactComponent implements OnInit {
  name = ''
  phone = ''
  mail = ''
  comment = ''
  contact: any;
  constructor(private service: ServService, private router: Router) { }

  ngOnInit() {
  }
  send(name: string, phone: string, mail: string, comment: string) {
    debugger;
    this.service.contact(name, phone, mail, comment).subscribe(
      res => {
        this.contact = res;
      },
      err => {
        console.log('error', err);
      }
    );
    this.router.navigate(['successContact']);
  }
}

    // this.service.mail('tnuabamaim@gmail.com','mail from costomer',this.name+
    // this.phone+this.mail+this.comment)
    //  .subscribe((sucsses)=>{
    // },
    // (error)=>
    // {
    //    console.log('error',error);
    // });

