import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { IngresoEgresoModel } from "../ingreso-egreso.model";
import { Label } from "ng2-charts";
import { IngresoEgresoReducerStates } from "../ingreso-egreso.reducer";

@Component({
  selector: "app-estadistica",
  templateUrl: "./estadistica.component.html",
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  subcription: Subscription = new Subscription();

  public doughnutChartLabels: Label[] = ["Egresos", "Ingresos"];
  public doughnutChartData: any = [];

  constructor(private store: Store<IngresoEgresoReducerStates>) {}

  ngOnInit() {
    this.subcription = this.store
      .select("ingresoEgreso")
      .subscribe(ingresoEgreso => {
        this.contarIngresoEgreso(ingresoEgreso.items);
      });
  }

  contarIngresoEgreso(items: IngresoEgresoModel[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach(item => {
      if (item.tipo === "ingreso") {
        this.cuantosIngresos++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [this.egresos, this.ingresos];
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
