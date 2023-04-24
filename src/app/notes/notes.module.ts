import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './components/notes/notes.component';
import { MatCardModule } from '@angular/material/card';
import { NewNoteDialogComponent } from './dialogs/new-note-dialog/new-note-dialog.component';
import { EditNoteDialogComponent } from './dialogs/edit-note-dialog/edit-note-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  declarations: [
    NotesComponent,
    NewNoteDialogComponent,
    EditNoteDialogComponent,
    NotesListComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ]
})
export class NotesModule { }
