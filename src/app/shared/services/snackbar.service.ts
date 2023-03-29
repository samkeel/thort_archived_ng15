import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  readonly defaultDuration = 5;
  durationInSeconds = 5;

  constructor(private _snackbar: MatSnackBar) {}

  openSnackBar(message: string, action: string, duration?: number) {
    if (typeof this.durationInSeconds !== 'undefined') {
      this.durationInSeconds = this.durationInSeconds;
    } else {
      this.durationInSeconds = this.defaultDuration;
    }
    this._snackbar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
