import { NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { LogoComponent } from "./logo/logo.component";
import { TranslateComponent } from "./translate/translate.component";
import { ServService } from "./service/server.service";
import { TranslateService } from "./service/TranslateService.service";
import { TranslatePipe } from "./Translate/Translate.pipe";
import { SubDetailsComponent } from "./Client/sub-details/sub-details.component";
import { ShowComponent } from "./Client/show/show.component";
import { MoreDetailsComponent } from "./Client/more-details/more-details.component";
import { RegistrationComponent } from "./Client/registration/registration.component";
import { OpenCoursComponent } from "./Client/open-cours/open-cours.component";
import { ContinueOpenCoursComponent } from "./Client/continue-open-cours/continue-open-cours.component";
import { ShowTeachersComponent } from "./Manager/show-teachers/show-teachers.component";
import { ShowStudentsComponent } from "./Manager/show-students/show-students.component";
import { ManagerComponent } from './manager/manager.component';
import { CreateEditTeacherComponent } from "./Manager/create-edit-teacher/create-edit-teacher.component";
import { CreateEditStudentComponent } from "./Manager/create-edit-student/create-edit-student.component";
import { ShowCoursesComponent } from "./Manager/show-courses/show-courses.component";
import { CreateEditCoursesComponent } from "./Manager/create-edit-courses/create-edit-courses.component";
import { SuccessRegistrationComponent } from "./Client/success-registration/success-registration.component";
import { HomeComponent } from "./Client/home/home.component";
import { CoursesComponent } from "./Client/courses/courses.component";
import { WaitManagerConfirmComponent } from "./Client/wait-manager-confirm/wait-manager-confirm.component";
import { PaymentComponent } from './Client/payment/payment.component';
import { ContactComponent } from './contact/contact.component';
import { ClientComponent } from "./Client/Client.component";
import { SuccessContactComponent } from './success-contact/success-contact.component';
import { Script } from "vm";
import { AboutComponent } from './about/about.component';
import { SurveysComponent } from './surveys/surveys.component';
import { CreateEditSubjectComponent } from "./Manager/create-edit-subject/create-edit-subject.component";
import { ShowSubjectsComponent } from "./Manager/show-subjects/show-subjects.component";
import { ShowRegistrationComponent } from "./Manager/show-registration/show-registration.component";
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from "src/app/login/login.component";





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubDetailsComponent,
    LogoComponent,
    ShowComponent,
    MoreDetailsComponent,
    TranslateComponent,
    TranslatePipe,
    RegistrationComponent,
    SuccessRegistrationComponent,
    OpenCoursComponent,
    ContinueOpenCoursComponent,
    ShowTeachersComponent,
    ShowStudentsComponent,
    ManagerComponent,
    CreateEditStudentComponent,
    CreateEditTeacherComponent,
    ShowCoursesComponent,
    CreateEditCoursesComponent,
    CoursesComponent,
    WaitManagerConfirmComponent,
    LoginComponent,
    PaymentComponent,
    ContactComponent,
    ClientComponent,
    SuccessContactComponent,
    AboutComponent,
    SurveysComponent,
    ShowSubjectsComponent,
    CreateEditSubjectComponent,
    ShowRegistrationComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([{
      path:'subDetails/:id',
      component:SubDetailsComponent
    },
    {
      path:'Home', 
      component:HomeComponent
    },
    {
    path:'Header', 
    component:HeaderComponent
    },
    {
      path:'Contact', 
      component:ContactComponent
    },
    {
      path:'SubDetails', 
      component:MoreDetailsComponent
    },
    {
      path:'Login', 
      component:LoginComponent
    },
    {
      path:'Login/:regToSite', 
      component:LoginComponent
    },
    {
      path:'defult', 
      component:HomeComponent
    },
    {
      path:'Courses', 
      component:CoursesComponent
    },
    {
      path:'CreateEditTeacher/:id/:CreateCourse', 
      component:CreateEditTeacherComponent
    },
    {
      path:'CreateEditStudent/:id', 
      component:CreateEditStudentComponent
    },
    {
      path:'CreateEditSubject/:id', 
      component:CreateEditSubjectComponent
    },
    {
      path:'Registration/:name/:id', 
      component:RegistrationComponent
    },
    {
      path:'SuccessRegistration', 
      component:SuccessRegistrationComponent 
    },
    {
      path:'ContinueOpenCours', 
      component:ContinueOpenCoursComponent 
    },
    // /:name
    {
      path:'Subject', 
      component:HomeComponent
    },
    {
      path:'Manager', 
      component:ManagerComponent
    },
    {
      path:'OpenCours', 
      component:OpenCoursComponent
    },
    {
      path:'ShowTeachers', 
      component:ShowTeachersComponent
    },
    {
      path:'ShowStudents', 
      component:ShowStudentsComponent
    },
    {
      path:'ShowSubjects', 
      component:ShowSubjectsComponent
    },
    {
      path:'ShowCourses', 
      component:ShowCoursesComponent
    },
    {
      path:'ShowRegistration', 
      component:ShowRegistrationComponent
    },
    {
      path:'CreateEditCourses/:id/:idSubject', 
      component:CreateEditCoursesComponent
    },
    {
      path:'payment/:fromWhere', 
      component:PaymentComponent
    },
    {
      path:'successContact', 
      component:SuccessContactComponent
    },
    {
      path:'Surveys', 
      component:SurveysComponent
    },
    {
      path:'About', 
      component:AboutComponent
    },
    {
      path:'',
      redirectTo:'/defult',
      pathMatch:'full'
    }
  ])
  ],

  providers: [ServService,TranslateService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }


