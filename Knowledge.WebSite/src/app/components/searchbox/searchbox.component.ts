import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {


  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  search(query: string) {
    if (query.length > 3) {
      this.router.navigateByUrl('home', {skipLocationChange: true}).then(() =>
        this.router.navigate([`search/${query}`]));
    }
  }
}
