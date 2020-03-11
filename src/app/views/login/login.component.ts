import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin = false;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  _statusMsg: any;

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: ['']
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }//ngOnInit

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  submitForm() {
    this.submitted = true;
    for (let controller in this.loginForm.controls) {
      this.loginForm.get(controller).markAsTouched();
    }

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('Invalid form');
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.id) {
            this.router.navigate([this.returnUrl]);
          } else {
            this._statusMsg = data.error;
          }
        },
        error => {
          this.error = error;
          this._statusMsg = error.error;
          this.loading = false;

        });
  }

}
