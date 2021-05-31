import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intranet',
  templateUrl: './intranet.component.html',
  styleUrls: ['./intranet.component.scss'],
})
export class IntranetComponent implements OnInit {

  tabs = [
    {
      id: 0,
      name: 'Perfil',
      tab: 'profile',
      icon: 'person-circle-outline'
    },
    {
      id: 1,
      name: 'Cuentas',
      tab: 'account',
      icon: 'cash-outline'
    },
    {
      id: 2,
      name: 'Transferencia QR',
      tab: 'transfer',
      icon: 'repeat-outline'
    }
  ];

  constructor() { }

  ngOnInit() {}

}
