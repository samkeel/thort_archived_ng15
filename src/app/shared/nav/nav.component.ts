import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavServiceService } from '../services/side-nav-service.service';
import { BpObserverService } from '../services/bp-observer.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @ViewChild('sidenav') public sidenav!: MatSidenav;

  isHandset$: Observable<boolean> = this.bpoService.Handset$;
  isHandsetPortrait$: Observable<boolean> = this.bpoService.HandsetPortrait$;
  isUserLoggedIn$: Observable<boolean> = this.user.isLoggedIn$;

  constructor(
    private bpoService: BpObserverService,
    private sideNavService: SideNavServiceService,
    public user: UserService
  ) {}

  ngAfterViewInit(): void {
    this.sideNavService.setSideNav(this.sidenav);
  }
}
