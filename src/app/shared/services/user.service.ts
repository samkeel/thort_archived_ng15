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
        this.snackbarService.openSnackBar(error.message, '');
      });
  }

  login(authData: AuthData) {
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => this.router.navigate(['/']))
      .then(() => this.snackbarService.openSnackBar('Welcome back', ''))
      .catch((error) => {
        this.snackbarService.openSnackBar(error.message, '');
      });
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => this.router.navigate(['']))
      .then(() => this.snackbarService.openSnackBar('Logged out', ''))
      .catch((error) => {
        this.snackbarService.openSnackBar(error.message, '');
      });
  }

  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }
}
