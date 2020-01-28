import { NgModule } from "@angular/core";

import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { OrdenIngresoEgresoPipe } from "./orden-ingreso-egreso.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutinModule } from "../dashboard/dashboard.routing.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutinModule
  ],
  declarations: [
    IngresoEgresoComponent,
    DashboardComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe
  ]
})
export class IngresoEgresoModule {}
