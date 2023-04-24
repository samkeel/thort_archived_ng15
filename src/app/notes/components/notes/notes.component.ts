import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { routeFadeStateTrigger } from 'src/app/shared/components/animations/route-animations';
import { BpObserverService } from 'src/app/shared/services/bp-observer.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  NewNoteDialogComponent,
  openNewNoteDialog,
} from '../../dialogs/new-note-dialog/new-note-dialog.component';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  animations: [routeFadeStateTrigger],
})
export class NotesComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = true;

  isHandsetPortrait$: Observable<boolean> = this.bpoService.HandsetPortrait$;
  // note!: Note
  notes$!: Observable<Note[]>;

  constructor(
    private bpoService: BpObserverService,
    public dialog: MatDialog,
    public noteService: NotesService
  ) {}

  ngOnInit(): void {
    this.notes$ = this.noteService.getAllNotes();

  }

  newNote() {
    openNewNoteDialog(this.dialog)
      .pipe(filter((val) => !!val))
      // .subscribe((val) => console.log('new value:', val));
      .subscribe((val) => this.noteService.createNote(val));
  }
}
