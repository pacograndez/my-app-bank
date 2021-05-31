import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../service/storage.service';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: any;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.authService.userProfile.subscribe(response => {
      this.profile = response ? response : JSON.parse(this.storageService.getData('userProfile'));
    });
  }

  logout() {
    this.presentLoading().then();
    setTimeout(() => {
      this.router.navigate(['auth/login']).then();
    }, 2500);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'cerrando sesión...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
