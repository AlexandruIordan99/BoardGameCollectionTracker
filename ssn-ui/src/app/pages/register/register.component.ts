import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {RegistrationRequest} from '../../services/models/registration-request';
import {AuthenticationControllerService} from '../../services/services/authentication-controller.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationControllerService
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['auth/activate-account']);
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        }
      });
  }
}
