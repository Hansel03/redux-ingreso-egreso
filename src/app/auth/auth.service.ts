import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  crearUsuario(nombre: string, email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        console.log(resp);
        this.router.navigate(["/"]);
      })
      .catch(error => {
        console.error(error);
        Swal.fire("Error en el registro", error.message, "error");
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        console.log(resp);
        this.router.navigate(["/"]);
      })
      .catch(error => {
        console.error(error);
        Swal.fire("Error login", error.message, "error");
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(["/login"]);
  }
}
