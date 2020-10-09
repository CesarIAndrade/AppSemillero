import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})
export class ScoresPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cards = [
    {
      name: 'Notas SGA',
      imageRoute: '../../assets/espam.png'
    },
    {
      name: 'Notas CAAI',
      imageRoute: '../../assets/caai.png'
    },
    {
      name: 'Notas CI',
      imageRoute: '../../assets/ci.png'
    },
  ]

}
