import {SchoolType} from './school-types.enum';
import {MaterialType} from './material-type.enum';
import {User} from './user';

export class Post {
  id: number;
  title: string;
  description: string;
  school: SchoolType;
  materialType: MaterialType;
  thumbImagePath: string;
  filePath: string;
  points: number;
  numberOfDownloads: number;
  userNickname: string;
  simplifiedTitle: string;
  addDateUtc: string;
}
