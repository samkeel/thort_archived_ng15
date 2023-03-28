import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, pipe } from 'rxjs';
import { map, shareReplay, tap, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BpObserverService {
  Handset$: Observable<boolean> = this._breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((results) => results.matches),
      shareReplay()
    );

  constructor(private _breakpointObserver: BreakpointObserver) {}
}
