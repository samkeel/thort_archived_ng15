import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenBreakService {

  constructor(private _breakpointObserver: BreakpointObserver) {
   }

}
