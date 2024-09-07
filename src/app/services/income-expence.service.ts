import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
  getDoc,
  collection,
  query,
  collectionData,
  where,
} from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { ProfileIncomeExpence } from '../models/income-expence';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenceService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  get currentUserIncomeExpence$(): Observable<ProfileIncomeExpence | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'incomeexpence', user?.uid);
        return docData(ref) as Observable<ProfileIncomeExpence>;
      })
    );
  }

  saveIncomeExpence(user: ProfileIncomeExpence): Observable<void> {
    const ref = doc(this.firestore, 'incomeexpence', user.uid);
    return from(setDoc(ref, user));
  }

  addIncomeexpence(user: ProfileIncomeExpence): Observable<void> {
    const ref = doc(this.firestore, 'incomeexpence', user.uid);
    return from(setDoc(ref, user));
  }

  async updateIncomeexpence(user: ProfileIncomeExpence): Promise<void> {
    const ref = doc(this.firestore, 'incomeexpence', user.uid);

    // Check if the document exists
    const docSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      // Document exists, update it
      await updateDoc(ref, { ...user });
    } else {
      // Document doesn't exist, create it
      await setDoc(ref, user);
    }
  }

  getIncomeexpenceByUid(uid: string): Observable<ProfileIncomeExpence | null> {
    const ref = doc(this.firestore, 'incomeexpence', uid);
    return docData(ref) as Observable<ProfileIncomeExpence>;
  }


  getIncomeexpenceData(uid: string, index: string): Observable<any[]> {
    const incomeexpenceCollection = collection(this.firestore, 'incomeexpence');
    const incomeexpenceQuery = query(incomeexpenceCollection, where('uid', '==', uid), where('index', '==', index));
    return collectionData(incomeexpenceQuery, { idField: 'id' }) as Observable<any[]>;
  }

}
