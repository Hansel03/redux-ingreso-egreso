import { NgModule } from "@angular/core";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [],
  declarations: [LoginComponent, RegisterComponent],
  providers: []
})
export class AuthModule {}
