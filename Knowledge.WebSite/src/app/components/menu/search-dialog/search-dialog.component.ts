import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent {

  constructor(public dialogRef: MatDialogRef<SearchDialogComponent>, private router: Router) {
    router.events.subscribe(event => {
      if (event) {
        dialogRef.close();
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
