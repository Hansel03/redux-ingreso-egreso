import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import * as firebase from "firebase";
import { map } from "rxjs/operators";
import { User } from "./user.model";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import {
  ActivarLoadingAction,
  DesactivarLoadingAction
} from "../shared/ui.accions";
import { SetUserAction, UnsetUserAction } from "./auth.actions";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private userSubcription: Subscription = new Subscription();
  private usuario: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUSer: firebase.User) => {
      if (fbUSer) {
        this.userSubcription = this.afDB
          .doc(`${fbUSer.uid}/usuario`)
          .valueChanges()
          .subscribe((usuarioObj: any) => {
            const newUSer = new User(usuarioObj);
            this.store.dispatch(new SetUserAction(newUSer));
            this.usuario = newUSer;
          });
      } else {
        this.usuario = null;
        this.userSubcription.unsubscribe();
      }
    });
  }

  crearUsuario(name: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());

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
            this.store.dispatch(new DesactivarLoadingAction());
          });

        this.router.navigate(["/"]);
      })
      .catch(error => {
        console.error(error);
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire("Error en el registro", error.message, "error");
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        console.log(resp);
        this.store.dispatch(new DesactivarLoadingAction());
        this.router.navigate(["/"]);
      })
      .catch(error => {
        console.error(error);
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire("Error login", error.message, "error");
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(["/login"]);
    this.store.dispatch(new UnsetUserAction());
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

  getUsuario() {
    return { ...this.usuario };
  }
}
