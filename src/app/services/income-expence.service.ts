import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { ProfileIncomeExpence } from '../models/income-expence';

// @Injectable({
//   providedIn: 'root'
// })
// export class IncomeExpenceService {

//   constructor(private firestore: Firestore, private authService: AuthService) {}

//   get currentUserIncomeExpence$(): Observable<ProfileIncomeExpence | null> {
//     return this.authService.currentUser$.pipe(
//       switchMap((user) => {
//         if (!user?.uid) {
//           return of(null);
//         }

//         const ref = doc(this.firestore, 'incomeexpence', user?.uid);
//         return docData(ref) as Observable<ProfileIncomeExpence>;
//       })
//     );
//   }

//   saveIncomeExpence(user: ProfileIncomeExpence, id:any): Observable<void> {
//     const ref = doc(this.firestore, 'incomeexpence', user.uid);
//     // const docRef = doc(this.firestore, 'incomeExpenses', uid);
//     return from(setDoc(ref, user));
//   }

//   addIncomeexpence(user: ProfileIncomeExpence): Observable<void> {
//     const ref = doc(this.firestore, 'incomeexpence', user.uid);
//     return from(setDoc(ref, user));
//   }

//   updateIncomeexpence(user: ProfileIncomeExpence): Observable<void> {
//     const ref = doc(this.firestore, 'incomeexpence', user.uid);
//     return from(updateDoc(ref, { ...user }));
//   }

//   getIncomeexpenceByUid(uid: string): Observable<ProfileIncomeExpence | null> {
//     const ref = doc(this.firestore, 'incomeexpence', uid);
//     return docData(ref) as Observable<ProfileIncomeExpence>;
//   }

//   // getIncomeExpenseData(uid: string): Observable<any> {
//   //   return this.firestore.collection('users').doc(uid).valueChanges();
//   // }
//   // getIncomeExpenseData(uid: string): Observable<ProfileIncomeExpence | null> {
//   //   const ref = doc(this.firestore, 'incomeexpence', uid);
//   //   // const docRef = doc(this.firestore, 'incomeExpenses', uid);
//   //   return docData(ref) as Observable<ProfileIncomeExpence>;
//   // }

// }





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

  updateIncomeexpence(user: ProfileIncomeExpence): Observable<void> {
    const ref = doc(this.firestore, 'incomeexpence', user.uid);
    return from(updateDoc(ref, { ...user }));
  }

  getIncomeexpenceByUid(uid: string): Observable<ProfileIncomeExpence | null> {
    const ref = doc(this.firestore, 'incomeexpence', uid);
    return docData(ref) as Observable<ProfileIncomeExpence>;
  }
}



