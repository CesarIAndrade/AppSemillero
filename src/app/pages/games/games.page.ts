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
      name: 'El Ahorcado',
      url: '/sidemenu/ahorcado',
      imageRoute: '../../assets/ahorcado.jpg',
      description: 'Descubre la palabra antes de morir'
    },
    {
      name: '¿Quién quiere ser millonario?',
      url: '/sidemenu/qqsm',
      imageRoute: '../../assets/qqsm.jpg',
      description: 'Responde la mayor cantidad de preguntas'
    },
  ];

}
