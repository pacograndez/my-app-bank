import {Injectable} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfile: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private fireAuth: AngularFireAuth,
    private httpClient: HttpClient,
    private storageService: StorageService
  ) { }

  login(username: string, password: string): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(username, password);
  }

  loginMock(username: string, password: string): Observable<any> {
    return this.httpClient.get('assets/json/user.json').pipe(map(
      (response: any) => response.body.find(x => x.userName === username && x.password === password)));
  }

  setUserProfile(user: any) {
    user.password = '******';
    this.userProfile.next(user);
    this.storageService.setData('userProfile', JSON.stringify(user));
  }

}
