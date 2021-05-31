import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {StorageService} from '../../service/storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;


  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private storageService: StorageService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    /*this.authService.login('paco@gmail.com', '123456').then(value => {
      console.log(value.user.uid);
    });*/
    this.form = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Usuario y/o clave incorrectos',
      buttons: ['Reintentar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  onSubmit() {
    if(this.form.valid) {
      this.presentLoading().then();
      this.authService.loginMock(this.form.get('username').value, this.form.get('password').value).subscribe(response => {
        if (response) {
          this.authService.setUserProfile(response);
          setTimeout(() => {
            this.router.navigate(['intranet/profile']).then();
          }, 2500);
        } else {
          setTimeout(() => {
            this.presentAlert().then();
          }, 2500);
        }
      });
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Obteniendo información...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
