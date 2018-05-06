import {SchoolTypes} from './school-types.enum';
import {MaterialType} from './material-type.enum';
import {User} from './user';

export class Post {
  id: number;
  title: string;
  description: string;
  school: SchoolTypes;
  type: MaterialType;
  thumbImagePath: string;
  filePath: string;
  points: number;
  downloads: number;
  user: User;
  dateOfAdding: string;
}
