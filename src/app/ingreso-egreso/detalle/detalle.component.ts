import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { IngresoEgresoModel } from "../ingreso-egreso.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgresoModel[];

  suncription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.suncription = this.store
      .select("ingresoEgreso")
      .subscribe(ingresoEgreso => {
        this.items = ingresoEgreso.items;
      });
  }

  borrarItem(uid: string) {}

  ngOnDestroy() {
    this.suncription.unsubscribe();
  }
}
