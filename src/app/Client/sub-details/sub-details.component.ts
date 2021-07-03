import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Details } from '../../Class/Details';
import { ServService } from '../../service/server.service';

@Component({
  selector: 'app-sub-details',
  templateUrl: './sub-details.component.html',
  styleUrls: ['./sub-details.component.css','../../../../src/app/app.component.css']
})
export class SubDetailsComponent implements OnInit {
  Id:number;
  temp:number;
  detailes:Details;
  constructor(private Arouter:ActivatedRoute,private service:ServService,private router:Router) { }
  ngOnInit() {
    debugger;
    this.Arouter.params.subscribe((params:Params)=>this.Id=params.id);
  }
}
