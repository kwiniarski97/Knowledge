import {Component, EventEmitter, OnInit} from '@angular/core';
import {MaterialTypes} from '../../models/material-type.enum';
import {SchoolTypes} from '../../models/school-types.enum';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  private static eventEmitter: EventEmitter<string> = new EventEmitter<string>();
  model: any = {};
  types = MaterialTypes;
  schools = SchoolTypes;
  files: File[] = [];
  encodedFiles: string[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  send(): any {
    // todo
    this.model.encodedFiles = this.encodedFiles;
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
      this.encodeMultipleFiles(files);
    } else {
      this.encodeSingleFile(files);
    }
  }

  cancelMultipleEvent(): void {
    this.files.length = 0;
    this.model.files = '';
  }

  private async encodeMultipleFiles(files: FileList) {
    AddComponent.eventEmitter.subscribe(data => {
      this.encodedFiles.push(data);
    });
    for (let i = 0; i < files.length; i++) {
      await this.encode(files[i]);

    }
  }

  private async encodeSingleFile(file: File) {
    // todo zrob zeby za kazdym razem wywolywala sie na nowym threadzie i gdy skonczy encodowac to niech to wrzuca do arraya stringFiles
    AddComponent.eventEmitter.subscribe(data => {
      this.encodedFiles.push(data);
    });
    await this.encode(file);

  }

  private encode(file: File) {
    const fileReader = new FileReader();

    fileReader.readAsBinaryString(file);

    fileReader.onloadend = (function () {
      AddComponent.eventEmitter.emit(fileReader.result);
    });

  }
}
