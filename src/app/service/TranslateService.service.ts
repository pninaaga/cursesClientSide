import { dir, SuportLang } from "../Translate/Translate";



export class TranslateService{
    private Dic:any;
    private Defult='HE';
    constructor(){
        if(!localStorage.getItem("chooseLang"))
        this.Dic=dir[this.Defult];
        else
        this.Dic=dir[localStorage.getItem("chooseLang")];
        this.GetLang();
    }
    GetTranslateValue(value){
       return this.Dic[value];
    }
    SetLang(Lang:string):any {
        localStorage.setItem("chooseLang",Lang); 
        this.Dic=dir[Lang];               
    }
    GetLang():string{
        debugger;
        if(!localStorage.getItem("chooseLang"))
        return this.Defult;
        return localStorage.getItem("chooseLang");
    }
   GetSuportLang(){
       return SuportLang;

}
}