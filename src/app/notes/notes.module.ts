import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './components/notes/notes.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    NotesComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MatCardModule
  ]
})
export class NotesModule { }
