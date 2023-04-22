import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { routeFadeStateTrigger } from 'src/app/shared/components/animations/route-animations';
import { BpObserverService } from 'src/app/shared/services/bp-observer.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  animations: [routeFadeStateTrigger],
})
export class NotesComponent {
  @HostBinding('@routeFadeState') routeAnimation = true;

  isHandsetPortrait$: Observable<boolean> = this.bpoService.HandsetPortrait$;

  constructor(
    private bpoService: BpObserverService,
  ) {}

}
