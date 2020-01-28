import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { IngresoEgresoModel } from "../ingreso-egreso.model";
import { Subscription } from "rxjs";
import { IngresoEgresoService } from "../ingreso-egreso.service";
import Swal from "sweetalert2";
import { IngresoEgresoReducerStates } from "../ingreso-egreso.reducer";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgresoModel[];

  suncription: Subscription = new Subscription();

  constructor(
    private store: Store<IngresoEgresoReducerStates>,
    public ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.suncription = this.store
      .select("ingresoEgreso")
      .subscribe(ingresoEgreso => {
        this.items = ingresoEgreso.items;
      });
  }

  borrarItem(item: IngresoEgresoModel) {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid).then(() => {
      Swal.fire("Eliminado", item.descripcion, "success");
    });
  }

  ngOnDestroy() {
    this.suncription.unsubscribe();
  }
}
