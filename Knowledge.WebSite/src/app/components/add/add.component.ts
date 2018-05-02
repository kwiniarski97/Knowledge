import {Component, OnInit} from '@angular/core';
import {MaterialType} from '../../models/material-type';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  model: any = {};
  types = MaterialType;
  files: File[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  send(): any {
    // todo
    console.log(this.model);
  }

  selectMultipleEvent(files: FileList | File): void {
    if (files instanceof FileList) {
      for (let i = 0; i < files.length; i++) {
        this.files.push(files[i]);
      }
    } else {
      this.files.push(files);
    }
  }

  uploadMultipleEvent(files: FileList | File): void {
    if (files instanceof FileList) {
      for (let i = 0; i < files.length; i++) {
        // todo code to base64 add to model
      }
    } else {
      // todo code to base64 add to model
    }
  }

  cancelMultipleEvent(): void {
    this.files.length = 0;
    this.model.files = '';
  }

}
