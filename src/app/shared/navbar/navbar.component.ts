import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { Subscription } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: string;

  subcription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subcription = this.store.select("auth").subscribe(usuarioLogin => {
      if (usuarioLogin.user) {
        this.user = usuarioLogin.user.nombre;
      }
    });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
