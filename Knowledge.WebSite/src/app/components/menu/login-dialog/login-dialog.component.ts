import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../../../services/auth.service';
import { LoginDto } from '../../../models/requests/loginDto';
import { RegisterDto } from '../../../models/requests/registerDto';
import { UserSessionService } from '../../../services/user-session.service';
import { GrowlService } from '../../growl/growl.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  loginDto: LoginDto = new LoginDto();

  registerDto: RegisterDto = new RegisterDto();
  agreedToRules: boolean;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService,
    private userSession: UserSessionService,
    private growlService: GrowlService
  ) {
    router.events.subscribe(event => {
      if (event) {
        dialogRef.close();
      }
    });
  }

  ngOnInit() {}

  login() {
    this.authService.login(this.loginDto).subscribe(
      ok => {
        this.userSession.userLogin(this.loginDto.nickname, ok);
        this.dialogRef.close();
      },
      err => {
        this.growlService.error('Wystąpił błąd', 'Sprawdź czy podałeś właściwe login i hasło.');
      }
    );
  }

  register() {
    this.authService.register(this.registerDto).subscribe(
      ok => {
        this.growlService.info('Na twój email wysłaliśmy link aktywacyjny.');
      },
      err => {
        this.growlService.error('Wystąpił spróbuj ponownie później');
      }
    );
  }
}
