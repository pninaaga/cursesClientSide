import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "../service/TranslateService.service";


@Pipe({
    name:'Translate'
})
export class TranslatePipe implements PipeTransform{
    constructor(private TranslateS:TranslateService){};
    transform(value: string, args?: any):string {
        if(!value)
        return;
       return this.TranslateS.GetTranslateValue(value);
    }
    
}