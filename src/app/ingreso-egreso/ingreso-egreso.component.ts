import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IngresoEgresoModel } from "./ingreso-egreso.model";
import { IngresoEgresoService } from "./ingreso-egreso.service";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import {
  ActivarLoadingAction,
  DesactivarLoadingAction
} from "../shared/ui.accions";
import { IngresoEgresoReducerStates } from "./ingreso-egreso.reducer";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  tipo = "ingreso";
  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor(
    public ingresoEgresoService: IngresoEgresoService,
    private store: Store<IngresoEgresoReducerStates>
  ) {}

  ngOnInit() {
    this.loadingSubs = this.store
      .select("ui")
      .subscribe(ui => (this.cargando = ui.isLoading));

    this.forma = new FormGroup({
      descripcion: new FormControl("", Validators.required),
      monto: new FormControl(0, Validators.min(0))
    });
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());

    const ingresoEgreso = new IngresoEgresoModel({
      ...this.forma.value,
      tipo: this.tipo
    });
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(new DesactivarLoadingAction());
        this.forma.reset({ monto: 0 });
        Swal.fire("Creado", ingresoEgreso.descripcion, "success");
      })
      .catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        console.log(err);
      });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }
}
