import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service';
import {StorageService} from '../../service/storage.service';
import {IAccount} from '../../model/iaccount.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {

  accounts: IAccount[];
  selectOpts: IAccount[];
  selectOpts2: IAccount[];
  form: FormGroup;

  constructor(
    private accountService: AccountService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.accountService.accounts.subscribe(response => {
      this.accounts = response && response.length > 0 ? response : JSON.parse(this.storageService.getData('accounts'));
      this.selectOpts = this.accounts;
    });

    this.form = this.fb.group({
      accountOrigin: ['', Validators.compose([Validators.required])],
      accountDestine: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])]
    });
  }

  onChangeFirstSelect(event: any) {
    this.selectOpts2 = this.selectOpts.filter(item => item.accountId !== event.target.value);
  }

  onTransferAmount() {
    if (this.form.valid) {

      const accountOrigin = this.accounts.find(item => item.accountId === this.form.get('accountOrigin').value);
      const accountDestine = this.accounts.find(item => item.accountId === this.form.get('accountDestine').value);
      const amount = Number(this.form.get('amount').value);

      if (this.validateBalance(Number(accountOrigin.accountAmount), amount)) {
        const account1: IAccount = {
          accountId: accountOrigin.accountId,
          userId: accountOrigin.userId,
          accountType: accountOrigin.accountType,
          accountNumber: accountOrigin.accountNumber,
          accountAmount: String(Number(accountOrigin.accountAmount) - amount),
          accountCurrency: accountOrigin.accountCurrency
        };

        const account2: IAccount = {
          accountId: accountDestine.accountId,
          userId: accountDestine.userId,
          accountType: accountDestine.accountType,
          accountNumber: accountDestine.accountNumber,
          accountAmount: String(Number(accountDestine.accountAmount) + amount),
          accountCurrency: accountDestine.accountCurrency
        };

        this.accounts = this.accounts.filter(item => item.accountId !== accountOrigin.accountId);
        this.accounts = this.accounts.filter(item => item.accountId !== accountDestine.accountId);


        this.accounts.push(account1, account2);
        this.accountService.setAllAccounts(this.accounts.sort((a, b) => (a.accountId > b.accountId? 1 : -1)));
        this.presentAlert2().then();
      } else {
        this.presentAlert().then();
      }
    }
  }

  validateBalance(balance, amountToTransfer: number): boolean {
    return (balance - amountToTransfer) >= 0;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Saldo insuficiente...',
      buttons: ['Reintentar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Transferencia exitosa...',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['intranet/account']).then();
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
