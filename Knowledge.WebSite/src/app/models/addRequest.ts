import {SchoolType} from './school-types.enum';
import {MaterialType} from './material-type.enum';

export class AddRequest {
  title: string;
  school: SchoolType;
  materialType: MaterialType;
  description: string;
  fileName: string;
  encodedFile: string;
}
