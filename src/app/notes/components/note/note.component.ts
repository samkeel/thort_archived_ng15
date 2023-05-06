import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Observable, Subscribable, Subscription, last } from 'rxjs';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit, OnDestroy {
  noteId: string = 'xx';
  // noteIdSubs!: Subscription;

  constructor(public noteService: NotesService) {}

  ngOnInit(): void {
    this.noteId = this.noteService.noteID.getValue();
    console.log('id value: ', this.noteId);
    // console.log(this.noteId);
    this.noteService.getNoteById(this.noteId);
    // this.noteId
    // this.noteService.getNoteById(this.noteService.noteIdValue)
    // this.noteIdSubs = this.noteService.noteIdValue.subscribe((noteId) => {
    //   this.noteId = noteId;
    // });

    // console.log(this.noteId);

    
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    // this.noteIdSubs.unsubscribe();
  }
}
