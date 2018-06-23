import { Pipe, PipeTransform } from '@angular/core';
import { SchoolType } from '../models/school-types.enum';

@Pipe({
  name: 'schoolname'
})
export class SchoolnamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return SchoolType[value];
  }

}
