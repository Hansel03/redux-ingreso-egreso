import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

const components = [FooterComponent, NavbarComponent, SidebarComponent];
@NgModule({
  imports: [CommonModule],
  exports: [...components],
  declarations: [...components],
  providers: []
})
export class SharedModule {}
