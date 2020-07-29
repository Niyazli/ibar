import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private _snackBar: MatSnackBar) {}

  showNotification(msg: string) {
    this._snackBar.open(msg, 'Close', {
      duration: 10000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
