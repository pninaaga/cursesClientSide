import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "Rxjs/operators";
import { Http } from '@angular/http';
import { Subject } from '../Class/Subject';
import { Student } from '../Class/Student';
import { Teacher } from '../Class/Teacher';
import { Course } from '../Class/Course';
import { templateJitUrl } from '@angular/compiler';
import { Connect } from '../Class/Connect';
import { Registration } from '../Class/Registration';
import { toDate } from '@angular/common/src/i18n/format_date';
import { TouchSequence } from 'selenium-webdriver';
import { filterQueryId } from '@angular/core/src/view/util';

const url = "http://localhost:8080/api/";

@Injectable({
  providedIn: 'root'
})

export class ServService {
  login: Connect;
  model: any;
  modelSubject: any;
  modelT: Teacher;
  modelS: Student;
  modelC: Course;
  AllSubjects: any[];
  AllSubSubjects: any[];
  modelR: Registration;
  constructor(private http: Http) { }
  GetSubSubject(id: number): any {
    debugger;
    return this.http.get(`${url}SubSubjectTbls/${id}`).pipe(map(res => res.json()));
  }
  GetAllSubSubject(): any {
    debugger;
    return this.http.get(`${url}AllSubSubjectTbls`).pipe(map(res => res.json()));
  }
  CreateTeacher(subjectOfTeacherTbl:number[],Tz:string,Days:number[]) {//יצירת מורה
    debugger;
    return this.http.post(`${url}TeacherTbls`, this.modelT).subscribe(
      res => {
        this.http.post(`${url}SubjectOfTeacherTbls/?Tz=${Tz}`,subjectOfTeacherTbl).subscribe(
          res=>{}, err=>{});
     this.http.post(`${url}AvailableTeacherTbls/?Tz=${Tz}`,Days).subscribe(
         res=>{}, err=>{});
       },
      err => { }
    );
  }
  // CreateTeacherToCours(){//שמירת מורה בטבלת נושאים של המורות

  // }
  EditTeacher(Id: number): any {
    return this.http.put(`${url}TeacherTbls/${Id}`, this.modelT).pipe(map(res => res.json()));
  }
  DeleteTeacher(id: number): any {
    return this.http.delete(`${url}TeacherTbls/${id}`).pipe(map(res => res.json()));
  }
  SaveStudent() {
    debugger;
    return this.http.post(`${url}StudentsTbls`, this.modelS).subscribe(
      res => { },
      err => { }
    );
  }
  SaveSubject() {
    if (this.modelSubject.SubjectNameFather == "NULL"|| this.modelSubject.SubjectNameFather==undefined)
      this.modelSubject.IdFatherSubject = null;
    else 
      this.modelSubject.IdFatherSubject = this.AllSubjects.filter(c => c.SubjectName == this.modelSubject.SubjectNameFather)[0].IdSubject;
    return this.http.post(`${url}SubjectTbls`, this.modelSubject).subscribe(
      res => { },
      err => { }
    );
  }
  // SaveSubjectsOfTeacher(subjectOfTeacherTbl:number[],Tz:string){
  //   debugger;
  //   return this.http.post(`${url}SubjectOfTeacherTbls/?Tz=${Tz}`,subjectOfTeacherTbl).subscribe(
  //   res=>{}, err=>{});
  // }
  // SaveAvaliableTeacher(Days:number[],Tz:string){
  //   debugger;
  //   return this.http.post(`${url}AvailableTeacherTbls/?Tz=${Tz}`,Days).subscribe(
  //   res=>{}, err=>{});
  // }

  
  EditStudent(Id: number): any {
    return this.http.put(`${url}StudentsTbls/${Id}`, this.modelS).pipe(map(res => res.json()));
  }
  DeleteStudent(id: number): any {
    return this.http.delete(`${url}StudentsTbls/${id}`).pipe(map(res => res.json()));
  }
  EditCourse(Id: number): any {
    debugger;
    // this.modelC.IdSubject=sessionStorage.getItem(this.modelC.SubectName);

    return this.http.put(`${url}CoursesTbls/${Id}`, this.modelC).pipe(map(res => res.json()));
  }
  CreateCourses() {
    debugger;
    return this.http.post(`${url}CoursesTbls`, this.modelC).subscribe(
      res => {
        debugger;
        console.log("res", res)
      },
      err => {
        debugger;
        console.log("err", err)
      }
    );
  }
  CreateStudentOpenCourse() {
    debugger;
    this.modelS = new Student();
    this.modelS.FirstNameS = this.login.FirstName;
    this.modelS.LastNameS = this.login.LastName;
    this.modelS.AddressS = this.model.Address;
    // this.modelS.Credit=this.model.Credit;
    this.modelS.EmailS = this.login.MailToConnect;
    // this.modelS.ExpiryDate=this.model.ExpiryDate;
    this.modelS.PhoneS = this.login.Phone;
    // this.modelS.ThreeDigit=this.model.ThreeDigit;
    // this.modelS.TzOfCreditsMan=this.model.TzOfCreditsMan;
    this.modelS.TzS = this.login.Tz;

    return this.http.post(`${url}StudentsTbls`, this.modelS).subscribe(
      res => { 
           this.SendParamterToStudentRegistrations().subscribe(
            res=>{
              debugger;
              console.log("res",res)
            },
            err=>{
              debugger;
             console.log("error SendParamterToStudentRegistrations",err)
            }
          ); },
      err => { }
    );
  }
  CreateOpenCourses() {
    this.modelC.DayInWeekC = this.model.DayInWeekC;
    this.modelC.PricePerHour = this.model.PricePerHour;
    this.modelC.AmountHour = this.model.AmountHour;
    this.modelC.IdSubject = this.model.IdSubject;
    this.modelC.IdTypeCourse = 2;
    debugger;
    return this.http.post(`${url}CreateOpenCourse`, this.modelC).subscribe(
      res => {
        (async () => {
            debugger;
            this.modelS = new Student();
            this.modelS.FirstNameS = this.login.FirstName;
            this.modelS.LastNameS = this.login.LastName;
            this.modelS.AddressS = this.model.Address;
            // this.modelS.Credit=this.model.Credit;
            this.modelS.EmailS = this.login.MailToConnect;
            // this.modelS.ExpiryDate=this.model.ExpiryDate;
            this.modelS.PhoneS = this.login.Phone;
            // this.modelS.ThreeDigit=this.model.ThreeDigit;
            // this.modelS.TzOfCreditsMan=this.model.TzOfCreditsMan;
            this.modelS.TzS = this.login.Tz;
        
            return this.http.post(`${url}StudentsTbls`, this.modelS).subscribe(
              res => { 
                (async ()=>{
                   this.SendParamterToStudentRegistrations().subscribe(
                    res=>{
                      debugger;
                      console.log("res",res)
                    },
                    err=>{
                      debugger;
                     console.log("error SendParamterToStudentRegistrations",err)
                    }
                  ); 
                })
              },
              err => { }
            );
       
          })
        console.log("res", res)
      },
      err => {
        debugger;
        console.log("err", err)
      }
    );
  }
  CreateCourseWithNewSubjects() {
    debugger;
    var data = [
      this.model.TzT,
      this.model.SubjectName,
      this.model.FatherSubject,
      this.modelC,
    ]
    return this.http.post(`${url}CourseWithNewSubjects`, data).subscribe(
      res => {
        debugger;
        console.log("res", res)
      },
      err => {
        debugger;
        console.log("err", err)
      }
    );
  }
  GetAllDetails(id: number): any {
    return this.http.get(`${url}CoursesTblsBySubjectId/${id}`).pipe(map(res => res.json()));
  }
  GetSubjects(id: number): any {
    debugger;
    return this.http.get(`${url}GetSubjects/${id}`).pipe(map(res => res.json()));
  }

  GetAllTeachers(): any {
    return this.http.get(`${url}TeacherTbls`).pipe(map(res => res.json()));
  }
  GetTeacher(id: number): any {
    debugger;
    return this.http.get(`${url}TeacherTbls/${id}`).pipe(map(res => res.json()));
  }
  GetAllStudents(): any {
    return this.http.get(`${url}StudentsTbls`).pipe(map(res => res.json()));
  }
  GetStudent(id: number): any {
    debugger;
    return this.http.get(`${url}StudentsTbls/${id}`).pipe(map(res => res.json()));
  }
  GetRegistrations(): any {
    return this.http.get(`${url}Registrations`).pipe(map(res => res.json()));
  }
  DeleteRegistration(id:number):any{
    debugger;
    return this.http.delete(`${url}Registrations/${id}`).pipe(map(res => res.json()));
  }
  LookForTeacherS(name: string): any {
    return this.http.get(`${url}LookForTeacher/${name}`).pipe(map(res => res.json()));
  }
  GetCourses(): any {
    debugger;
    return this.http.get(`${url}CoursesTbls`).pipe(map(res => res.json()));
  }
  GetCourse(id: number): any {
    return this.http.get(`${url}CoursesTbls/${id}`).pipe(map(res => res.json()));
  }
  DeleteCourse(id: number): any {
    return this.http.delete(`${url}CoursesTbls/${id}`).pipe(map(res => res.json()));
  }
  GetMinStudent(Subject: string): any {
    debugger;
    return this.http.get(`${url}GetMinStudent/${Subject}`).pipe(map(res => res.json()));
  }
  GetAllSubjects(): any {
    debugger;
    return this.http.get(`${url}GetAllSubjectsM`).pipe(map(res => res.json()));
  }
  // SearchC(text:Text):any
  // {

  // }

  GetAllSubject(): any {
    return this.http.get(`${url}SubjectTbls`).pipe(map(res => res.json()));
  }
  // RegistrationsStudent():any{
  //   debugger;
  //   return this.http.post(`${url}Registrations`,this.model).subscribe(
  //     res=>{
  //       debugger;
  //       console.log("res",res)
  //     },
  //     err=>{
  //       debugger;
  //      console.log("err",err)
  //     }
  //   );
  // }
  SendParamterToStudentRegistrations(): any {
    debugger;
    // return this.http.get(`${url}SendParamterToStudentRegistrations/?param=${this.model.IdSubject}+${this.model.DayInWeekC}`).pipe(map(res=>res.json()));
    return this.http.get(`${url}SendParamterToStudentRegistrations/?param=${this.model.IdSubject}+${this.model.DayInWeekC}+${this.login.IdConnect}`).pipe(map(res => res.json()));
    // ?param=${this.model.IdSubject}+${this.model.DayInWeekC}
    // +${this.login.IdConnect}
  }
  RegistrationsStudent(): any {
    // var id=this.modelR.IdCourse;
    this.modelR = new Registration();
    this.modelR.IdCourse = this.model.IdCourse;
    this.modelR.IdStudent = this.login.IdConnect;//  idכדי שנוכל לשלוף אח"כ את התלמידה לפי ה
    return this.http.post(`${url}Registrations`, this.modelR)

  }
  GetDetailsForOpenCoursComponent(): any {
    debugger;
    return this.http.get(`${url}GetDetailsForOpenCoursComponent/?subjectNameAndDay=${this.model.Subject}+${this.model.DayInWeekC}`).pipe(map(res => res.json()));
  }
  // SaveCours(model:any){

  // }
  GetSubject(id: number): any {
    return this.http.get(`${url}SubjectTbls/${id}`).pipe(map(res => res.json()));
  }
  GetSubjectM(id: number): any {
    return this.http.get(`${url}SubjectTblsForManager/${id}`).pipe(map(res => res.json()));
  }
  DeleteSubject(id: number): any {
    return this.http.delete(`${url}SubjectTbls/${id}`).pipe(map(res => res.json()));
  }
  EditSubject(Id: number): any {
    debugger;
    if (this.modelSubject.SubjectNameFather == "NULL"|| this.modelSubject.SubjectNameFather==undefined)
      this.modelSubject.IdFatherSubject = null;
    else 
      this.modelSubject.IdFatherSubject = this.AllSubjects.filter(c => c.SubjectName == this.modelSubject.SubjectNameFather)[0].IdSubject;
    return this.http.put(`${url}SubjectTbls/${Id}`, this.modelSubject).pipe(map(res => res.json()));
  }

  GetLoginPerson(): any {
    debugger
    return this.http.get(`${url}GetLogin/?login=${this.login.PasswordC}+${this.login.MailToConnect}`).pipe(map(res => res.json()));
  }
  EditLoginPerson(connect: Connect): any {
    debugger;
    return this.http.put(`${url}GetConnectByNameAndPassword`, connect).pipe(map(res => res.json()));
  }
  CreateNewConnect(): any {
    return this.http.post(`${url}Connects`, this.login)
  }
  contact(name: string, phone: string, mail: string, comment: string) {
    debugger;
    return this.http.get(`${url}Getcontact/?detailsContact=${name}+${phone}+${mail}+${comment}`).pipe(map(res => res.json()));


  }
  mail():any
  {
    debugger;
    return this.http.get(`${url}sendEmails`).pipe((map)(res =>res.json()));
  }
  EditConnect(connect:Connect):any{
debugger;
connect=this.login;
    return this.http.put(`${url}Connects/${connect.IdConnect}`, connect).pipe(map(res => res.json()));
  }
}
