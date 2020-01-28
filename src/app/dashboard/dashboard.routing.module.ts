import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { dashboardRoutes } from "./dashboard.routes";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: dashboardRoutes
    // canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class DashboardRoutinModule {}
