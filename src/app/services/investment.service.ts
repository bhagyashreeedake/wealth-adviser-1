import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { ProfileInvestment } from '../models/investment';
// import { ProfileInvestmet } from '../models/insurance';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private firestore: Firestore, private authService: AuthService) {}

  get currentUserInvetment$(): Observable<ProfileInvestment | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'investment', user?.uid);
        return docData(ref) as Observable<ProfileInvestment>;
      })
    );
  }

  addInvestment(user: ProfileInvestment, id:any): Observable<void> {
    const ref = doc(this.firestore, 'investment', user.uid+id);
    return from(setDoc(ref, user));
  }

  updateInvestment(user: ProfileInvestment): Observable<void> {
    const ref = doc(this.firestore, 'investment', user.uid);
    return from(updateDoc(ref, { ...user }));
  }


  

  getInvestmentByUid(uid: string, id:string): Observable<ProfileInvestment | null> {
    const ref = doc(this.firestore, 'investment', uid+id);
    
    return docData(ref) as Observable<ProfileInvestment>;
    
  }
  getInvestmentData(uid: string, index: string): Observable<any[]> {
    const investmentCollection = collection(this.firestore, 'investment');
    const investmentQuery = query(investmentCollection, where('uid', '==', uid), where('index', '==', index));
    return collectionData(investmentQuery, { idField: 'id' }) as Observable<any[]>;
  }
}
