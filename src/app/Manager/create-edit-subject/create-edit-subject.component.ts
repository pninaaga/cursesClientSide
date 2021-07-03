import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ServService } from '../../service/server.service';
import { Subject } from '../../Class/Subject';

@Component({
  selector: 'app-create-edit-subject',
  templateUrl: './create-edit-subject.component.html',
  styleUrls: ['./create-edit-subject.component.css','../../../../src/app/app.component.css','../manager.component.css']
})
export class CreateEditSubjectComponent implements OnInit {

  constructor(private Arouter:ActivatedRoute,private service:ServService, private router:Router) { }
  id:number;
  model:any;
  AllSubject:Subject[];
    ngOnInit() {
      this.Arouter.params.subscribe((params:Params)=>this.id=params.id)
      this.AllSubject=this.service.AllSubjects;
      if(this.id==0)
      {
      this.model=new Subject();
      debugger;
    }
      else
      {
        debugger;
      this.service.GetSubjectM(this.id).subscribe(
        res=>{
          debugger;
          this.model=res[0];
        },
        err=>{
          debugger;
          console.log("error with get Subject",err);
        }
      )
    }
    }

    FuncSave()
    {
      debugger;
      this.service.modelSubject=this.model;
      if(this.id==0){
        debugger;
      this.service.SaveSubject();
      this.router.navigate(['ShowSubjects']);
      }
      else
      {
      this.service.EditSubject(this.model.IdSubject).subscribe(
        res=>{
          this.model=res;
        },
        err=>{
          console.log("error with edit Subject")
        }
      )
      this.router.navigate(['ShowSubjects']);
    }
   
    }

}
