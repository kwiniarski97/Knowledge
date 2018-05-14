import {Component, EventEmitter, OnInit} from '@angular/core';
import {MaterialType} from '../../models/material-type.enum';
import {SchoolType} from '../../models/school-types.enum';
import {PostService} from '../../services/post.service';
import {AddRequest} from '../../models/addRequest';
import {Router} from '@angular/router';

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

  constructor(private postService: PostService, private router: Router) {
  }

  ngOnInit() {
  }

  send(): void {
    this.postService.add(this.model).subscribe(ok => {
        alert('Pomyślnie dodano plik');
        this.clearFiles();
        this.router.navigate(['/']);
      },
      error => {
        alert('Wystąpił błąd');
      });
  }

  selectEvent(file: File): void {
    this.file = file;

  }

  uploadEvent(): void {
    this.model.fileName = this.file.name;
    this.encodeFile();

  }

  cancelEvent(): void {
    this.clearFiles();
  }


  private encodeFile() {
    this.encode(this.file).then(data => {
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


  private clearFiles() {
    this.file = null;
    this.model.encodedFile = null;
  }
}
