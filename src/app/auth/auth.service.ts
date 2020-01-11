import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import * as firebase from "firebase";
import { map } from "rxjs/operators";
import { User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUSer: firebase.User) => {
      console.log(fbUSer);
    });
  }

  crearUsuario(name: string, email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: name,
          email: resp.user.email
        };

        this.afDB
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(["/"]);
          });

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

  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser === null) {
          this.router.navigate(["/login"]);
        }

        return fbUser !== null;
      })
    );
  }
}
