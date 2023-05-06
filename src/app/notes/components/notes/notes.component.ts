import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
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
export class NotesComponent implements OnInit, OnDestroy {
  @HostBinding('@routeFadeState') routeAnimation = true;

  isHandsetPortrait$: Observable<boolean> = this.bpoService.HandsetPortrait$;
  notes$!: Observable<Note[]>;

  constructor(
    private bpoService: BpObserverService,
    public dialog: MatDialog,
    public noteService: NotesService
  ) {}

  ngOnInit(): void {
    this.notes$ = this.noteService.getAllNotes();
  }

  ngOnDestroy(): void {
      
  }

  newNote() {
    openNewNoteDialog(this.dialog)
      .pipe(filter((val) => !!val))
      .subscribe((val) => this.noteService.createNote(val));
  }
}
