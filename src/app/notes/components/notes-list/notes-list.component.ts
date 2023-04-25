import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent {
  @Input() public title = '';
  @Input() public date = '';
  @Input() public content = '';
  @Input() public id = '';

}
