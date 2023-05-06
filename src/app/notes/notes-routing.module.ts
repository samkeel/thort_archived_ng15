import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './components/notes/notes.component';
import { NoteComponent } from './components/note/note.component';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent
  },
  {
    path: 'note',
    title: 'Thort - Note',
    component: NoteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
