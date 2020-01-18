import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { Subscription } from "rxjs";
import { IngresoEgresoService } from "src/app/ingreso-egreso/ingreso-egreso.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: string;

  subcription: Subscription = new Subscription();
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    public ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.subcription = this.store.select("auth").subscribe(usuarioLogin => {
      if (usuarioLogin.user) {
        this.user = usuarioLogin.user.nombre;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubcriptions();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
