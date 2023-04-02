import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BpObserverService } from '../../services/bp-observer.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  isHandsetPortrait$: Observable<boolean> = this.bpoService.HandsetPortrait$;

  signUpForm = this.fb.group({
    email: [
      '',
      { validators: [Validators.required, Validators.email], updateOn: 'blur' },
    ],
    password: ['', { validators: [Validators.required] }],
  });

  constructor(private fb: FormBuilder,
     private _userService: UserService,
     private bpoService: BpObserverService,
     ) {}

  get email() {
    return this.signUpForm.controls['email'];
  }

  get password() {
    return this.signUpForm.controls['password'];
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email must be filled out';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    const email: string = this.email.value as string;
    const password: string = this.password.value as string;

    this._userService.signUpNewUserEmail({
      email: email,
      password: password,
    });
  }

}
