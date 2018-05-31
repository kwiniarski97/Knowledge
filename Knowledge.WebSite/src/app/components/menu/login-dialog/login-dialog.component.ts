import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../../../services/auth.service';
import {LoginDto} from '../../../models/requests/loginDto';
import {RegisterDto} from '../../../models/requests/registerDto';
import { JwtService } from '../../../services/jwt.service';
import { Jwt } from '../../../models/jwt';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  loginDto: LoginDto = new LoginDto();

  registerDto: RegisterDto = new RegisterDto();
  agreedToRules: boolean;

  constructor(private router: Router, public dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService, , private jwtService: JwtService) {
    router.events.subscribe(event => {
      if (event) {
        dialogRef.close();
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginDto).subscribe(ok => {
        const jwt = ok as Jwt;
        this.jwtService.setJwt(jwt);
      },
      err => {
        alert(err);
      });
  }

  register() {
    this.authService.register(this.registerDto).subscribe(ok => {
      alert('Na twój email wysłaliśmy link aktywacyjny.');
    }, err => {
      alert('Wystąpił błąd');
    });
  }
}
