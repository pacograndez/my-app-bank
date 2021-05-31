import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service';
import {IAccount} from '../../model/iaccount.interface';
import {StorageService} from '../../service/storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  accounts: IAccount[];

  constructor(
    private accountService: AccountService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.accountService.accounts.subscribe(response => {
      this.accounts = response && response.length > 0 ? response : JSON.parse(this.storageService.getData('accounts'));

      if (!this.accounts || this.accounts.length < 0) {
        this.accountService.getAllAccountsMock('').subscribe(response2 => {
          this.accounts = response2.body;
          this.accountService.setAllAccounts(this.accounts);
        });
      }
    });
  }

}
