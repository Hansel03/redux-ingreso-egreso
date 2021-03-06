import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule],
  exports: [],
  declarations: [LoginComponent, RegisterComponent],
  providers: []
})
export class AuthModule {}
