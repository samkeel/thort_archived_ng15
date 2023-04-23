import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Note } from '../models/note.model';
import { Firestore, collectionData } from '@angular/fire/firestore';
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private noteCollection!: CollectionReference<DocumentData>;

  constructor(
    private afAuth: AngularFireAuth,
    private readonly firestore: Firestore
  ) {
    this.noteCollection = collection(this.firestore, 'Notes');
  }

  async createNote(note: Note) {
    const user = await this.afAuth.currentUser;
    return addDoc(this.noteCollection, { ...note, uid: user?.uid });
  }

  // Read a list of titles of notes owned by current user

  // Read all notes owned by current user
  getAllNotes() {
    return collectionData(this.noteCollection, {
      idField: 'id',
    }) as Observable<Note[]>;
  }

  // Read by ID
  getNoteById(note: Note) {
    return addDoc(this.noteCollection, note);
  }

  // update single note
  updateNote(note: Note) {
    const noteDocumentReference = doc(this.firestore, `Notes/${note.id}`);
    return updateDoc(noteDocumentReference, { ...note });
  }

  // delete single note
  deleteNoteById(id: string) {
    const noteDocumentReference = doc(this.firestore, `Notes/${id}`);
  }
}
