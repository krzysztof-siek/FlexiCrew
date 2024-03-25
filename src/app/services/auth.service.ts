import {Injectable, signal, WritableSignal} from '@angular/core';
import {BehaviorSubject, from, Observable, switchMap} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserInterface} from "../interfaces/user-interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$!: Observable<any>;
  currentUserSig: WritableSignal<UserInterface | null> = signal<any>(undefined)
  constructor(private firebaseAuth: AngularFireAuth) {
    this.user$ = this.firebaseAuth.authState;
  }

  register(email: string, username: string, password: string): Observable<any> {
    return from(this.firebaseAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap(userCredential => {
        if (userCredential.user) {
          return from(userCredential.user.updateProfile({ displayName: username })).pipe(
            switchMap(() => this.firebaseAuth.signOut())
          );
        }
        return [];
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(this.firebaseAuth.signInWithEmailAndPassword(email, password));
  }

  logout(): Observable<void> {
    const promise: Promise<void> = this.firebaseAuth.signOut();
    return from(promise)
  }

}
