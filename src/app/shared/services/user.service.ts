import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthData } from '../Models/auth-data.model';
import { SnackbarService } from './snackbar.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn$: Observable<boolean>;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private snackbarService: SnackbarService,
    private loaderService: LoaderService
  ) {
    this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));
  }

  signUpNewUserEmail(authData: AuthData) {
    this.loaderService.loadingStateChanged.next(true);
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => this.loaderService.loadingStateChanged.next(false))
      .then(() => this.router.navigate(['/']))
      .then(() => this.snackbarService.openSnackBar('Welcome to the dark side', ''))
      .catch((error) => {
        this.loaderService.loadingStateChanged.next(false);
        this.snackbarService.openSnackBar(this.convertErrorMessage(error['code']), '');
      });
  }

  login(authData: AuthData) {
    this.loaderService.loadingStateChanged.next(true);
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => this.loaderService.loadingStateChanged.next(false))
      .then(() => this.router.navigate(['notes']))
      .then(() => this.snackbarService.openSnackBar('Welcome back \(^-^)/', ''))
      .catch((error) => {
        this.loaderService.loadingStateChanged.next(false);
        this.snackbarService.openSnackBar(this.convertErrorMessage(error['code']), '');
      });
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => this.router.navigate(['']))
      .then(() => this.snackbarService.openSnackBar('Logged out ( ･_･)/', ''))
      .catch((error) => {
        this.snackbarService.openSnackBar(error.message, '');        
      });
  }

  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }

  convertErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-disabled': {
        return 'Sorry your user is disabled (°o•)'
      }
      case 'auth/user-not-found': {
        return 'Email address not found ¯\\_(ツ)_/¯'
      }
      case 'auth/email-already-in-use': {
        return 'Email already exists (ಥ﹏ಥ)'
      }
      default: {
        return "Login error try again later (⊙＿⊙')"
      }
    }
  }
}
