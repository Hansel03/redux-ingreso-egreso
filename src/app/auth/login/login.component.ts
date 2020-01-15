import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  public cargando: boolean;
  subcription: Subscription;

  constructor(
    private authService: AuthService,
    public store: Store<AppState>
  ) {}

  ngOnInit() {
    this.subcription = this.store
      .select("ui")
      .subscribe(ui => (this.cargando = ui.isLoading));
  }

  public onSubmit(data: any) {
    this.authService.login(data.email, data.password);
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
