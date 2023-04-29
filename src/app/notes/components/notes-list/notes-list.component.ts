import { Component, Input } from '@angular/core';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent {
  @Input() public title = '';
  @Input() public date = '';
  @Input() public content = '';
  @Input() public id = '';
  @Input() public summary = '';

  constructor(public noteService: NotesService) {}

  handleDelete() {
    this.noteService.deleteNoteById(this.id);
  }
}
