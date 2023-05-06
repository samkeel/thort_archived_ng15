import { Component, Input } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Router } from '@angular/router';

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

  constructor(public noteService: NotesService, private router: Router) {}

  deleteNote() {
    this.noteService.deleteNoteById(this.id);
  }

  openNote() {
    this.noteService.noteID.next(this.id);
    // this.noteService.noteIdValue.next(this.id);
    this.router.navigate(['notes/note']);
  }
}
