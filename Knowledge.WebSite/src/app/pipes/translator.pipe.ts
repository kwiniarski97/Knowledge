import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translator'
})
export class TranslatorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    return null;
  }

}
