import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Note } from '../models/note.model';
import {
  Firestore,
  collectionData,
  docData,
  documentId,
  orderBy,
} from '@angular/fire/firestore';
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
  getDoc,
} from '@firebase/firestore';
import { BehaviorSubject, Observable, Subject, from, switchMap } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private noteCollection!: CollectionReference<DocumentData>;
  noteID = new BehaviorSubject<string>('');
  noteIdValue = new Subject<string>();

  constructor(
    private afAuth: AngularFireAuth,
    private readonly firestore: Firestore,
    private snackbarService: SnackbarService
  ) {
    this.noteCollection = collection(this.firestore, 'Notes');
  }

  async createNote(note: Note) {
    const user = await this.afAuth.currentUser;
    let content = note.content as string;
    note.summary = this.contentSummary(content);
    this.snackbarService.openSnackBar('New note added', '');
    return addDoc(this.noteCollection, { ...note, uid: user?.uid });
  }

  // Read a list of titles and summaraies of notes owned by current user

  // Read all notes owned by current user
  getAllNotes() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          const allUserNotes = query(
            collection(this.firestore, `Notes/`),
            where('uid', '==', user?.uid),
            orderBy('title')
          );
          return collectionData(allUserNotes, { idField: 'id' }) as Observable<
            Note[]
          >;
        } else {
          return [];
        }
      })
    );
  }

  // Read by ID
  // async getNoteById(noteId: string): Promise<any> {
  //   const noteDocumentReference = doc(this.firestore, `Notes/${noteId}`);
  //   const noteDocumentSnapshot = await getDoc(noteDocumentReference);
  //   return noteDocumentSnapshot.data();
  // }
  async getNoteById(noteId: string) {
    // const docRef = this.firestore.doc
    // const noteDocumentReference = doc(this.firestore, '/Notes/tpANFOzA3VvM0zH7ojZT');
    const noteDocumentReference = doc(this.firestore, `Notes/${noteId}`);
    const docSnap = await getDoc(noteDocumentReference);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      console.log('no such document');
    }
  }

  get(id: string) {
    const noteDocumentReference = doc(this.firestore, `Notes/{id}`);
    return docData(noteDocumentReference, { idField: 'id' });
  }

  // update single note
  updateNote(note: Note) {
    const noteDocumentReference = doc(this.firestore, `Notes/${note.id}`);
    return updateDoc(noteDocumentReference, { ...note });
  }

  // delete single note
  deleteNoteById(id: string) {
    const noteDocumentReference = doc(this.firestore, `Notes/${id}`);
    this.snackbarService.openSnackBar('Note deleted', '');
    return deleteDoc(noteDocumentReference);
  }

  contentSummary(content: string, length: number = 50): string {
    let summary = content.slice(0, length);

    if (content.length > length) {
      summary += '...';
    }
    return summary;
  }
}
