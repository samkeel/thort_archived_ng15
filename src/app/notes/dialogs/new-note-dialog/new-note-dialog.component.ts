import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-new-note-dialog',
  templateUrl: './new-note-dialog.component.html',
  styleUrls: ['./new-note-dialog.component.scss'],
})
export class NewNoteDialogComponent {
  newNoteForm = this.fb.group({
    title: ['', { validators: [Validators.required], updateOn: 'blur' }],
    content: [''],
    date: new Date(),
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public note: Note,
    private dialogRef: MatDialogRef<NewNoteDialogComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.newNoteForm.value);
  }


}

export function openNewNoteDialog(dialog: MatDialog) {
  const dialogRef = dialog.open(NewNoteDialogComponent);

  return dialogRef.afterClosed();
}
