import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BpObserverService } from '../services/bp-observer.service';
import { SideNavServiceService } from '../services/side-nav-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  ishandset$: Observable<boolean> = this.bpoService.Handset$;

  constructor(
    private bpoService: BpObserverService,
    private sideNavService: SideNavServiceService
  ) {}

  ngOnInit(): void {}

  toggleNav(): void {
    this.sideNavService.toggle();
  }
}
