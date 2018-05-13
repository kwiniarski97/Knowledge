import {Component, EventEmitter, OnInit} from '@angular/core';
import {MaterialType} from '../../models/material-type.enum';
import {SchoolType} from '../../models/school-types.enum';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {PostService} from '../../services/post.service';
import {AddRequest} from '../../models/addRequest';
import {async} from '@angular/core/testing';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  model: AddRequest = new AddRequest();
  types = MaterialType;
  schools = SchoolType;
  file: File;
  isEncodingEnded = true;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
  }

  send(): void {
    this.postService.add(this.model).subscribe();
    console.log(this.model);
  }

  selectEvent(file: File): void {
    this.file = file;

  }

  uploadEvent(file: File): void {
    this.model.fileName = file.name;
    this.encodeFile(file);

  }

  cancelEvent(): void {
    this.file = null;
  }


  private encodeFile(file: File) {
    this.encode(file).then(data => {
      this.model.encodedFile = (data as string); // removes header from base64 string
    });

  }

  private encode(file: File) {
    this.isEncodingEnded = false;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
        this.isEncodingEnded = true;
      };
      reader.onerror = error => {
        reject(error);
        this.isEncodingEnded = true;
      };
    });


  }


}
