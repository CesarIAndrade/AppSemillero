import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  games = [
    {
      name: 'Sopa de letras',
      url: '/sopadeletras',
      imageRoute: '../../assets/sdp.jpg',
      description: ''
    },
    {
      name: 'El Ahorcado',
      url: 'ahorcado',
      imageRoute: '../../assets/ahorcado.jpg',
      description: ''
    },
    {
      name: 'Crucigrama',
      url: 'crucigrama',
      imageRoute: '../../assets/crucigrama.png',
      description: ''
    },
    {
      name: '¿Quién quiere ser millonario?',
      url: 'qqsm',
      imageRoute: '../../assets/qqsm.jpg',
      description: ''
    },
  ];

}
