import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: []
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public onSubmit(data: any) {
    console.log(data);
  }
}
