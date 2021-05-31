import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import {take} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IAccount} from '../model/iaccount.interface';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts: BehaviorSubject<IAccount[]> = new BehaviorSubject<IAccount[]>([]);

  constructor(
    private angularFirestore: AngularFirestore,
    private httpClient: HttpClient,
    private storageService: StorageService
  ) { }

  getAllAccount(userId: string): Observable<any> {
    return this.angularFirestore.collection('account', ref => ref.where('uid','==',userId))
      .valueChanges().pipe(take(1));
  }

  getAllAccountsMock(userId: string): Observable<any> {
    return this.httpClient.get('assets/json/account.json').pipe();
  }

  setAllAccounts(accounts: IAccount[]) {
    this.accounts.next(accounts);
    this.storageService.setData('accounts', JSON.stringify(accounts));
  }
}
