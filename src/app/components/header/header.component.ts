import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    if (this.router.url.split("/").length == 3) {
      this.headerLabel = this.CapitalizeWord(this.router.url.split("/")[2]);
    } else {
      this.headerLabel = this.CapitalizeWord(this.router.url.split("/")[1]);
    }
  }

  headerLabel: string;

  CapitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1);
  }
}
