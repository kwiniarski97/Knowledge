import {SchoolTypes} from './school-types.enum';
import {MaterialTypes} from './material-type.enum';
import {User} from './user';

export class Post {
  id: number;
  title: string;
  description: string;
  school: SchoolTypes;
  materialType: MaterialTypes;
  thumbImagePath: string;
  filePath: string;
  points: number;
  numberOfDownloads: number;
  user: User;
  addDateUtc: string;
}
