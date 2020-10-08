import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user.idTipo == 1) {
      this.menuItems = [
        {
          label: "Actividades",
          icon: "game-controller-outline",
          url: "",
        },
        {
          label: "Foros",
          icon: "list-outline",
          url: "",
        },
      ];
    } else {
      this.menuItems = [
        {
          label: "Inicio",
          icon: "home",
          url: "/tabs/estadisticas",
        },
        {
          label: "Notas",
          icon: "podium-outline",
          url: "/scores",
        },
        {
          label: "Juegos",
          icon: "game-controller-outline",
          url: "/tabs/juegos",
        },
        {
          label: "Perfil",
          icon: "person-outline",
          url: "/tabs/perfil",
        }
      ];
    }
  }

  menuItems = [];
}
