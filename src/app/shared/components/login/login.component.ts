import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BpObserverService } from '../../services/bp-observer.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { routeFadeStateTrigger } from '../animations/route-animations';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routeFadeStateTrigger],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  @HostBinding('@routeFadeState') routeAnimation = true;
  isLoading = false;
  loadingSubs!: Subscription;

  isHandsetPortrait$: Observable<boolean> = this.bpoService.HandsetPortrait$;

  signInForm = this.fb.group({
    email: [
      '',
      { validators: [Validators.required, Validators.email], updateOn: 'blur' },
    ],
    password: ['', { validators: [Validators.required] }],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _userService: UserService,
    private bpoService: BpObserverService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loadingSubs = this.loaderService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  get email() {
    return this.signInForm.controls['email'];
  }

  get password() {
    return this.signInForm.controls['password'];
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email must be filled out';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  signUpLink() {
    this.router.navigate(['signup'])
  }

  onSubmit() {
    const email: string = this.email.value as string;
    const password: string = this.password.value as string;

    this._userService.login({
      email: email,
      password: password,
    });
  }
}
