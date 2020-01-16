import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { IngresoEgresoModel } from "./ingreso-egreso.model";
import { AuthService } from "../auth/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { filter, map } from "rxjs/operators";
import { SetItemsAction } from "./ingreso-egreso.actions";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class IngresoEgresoService {
  ingresoEgresoListerSubcription: Subscription = new Subscription();
  ingresoEgresoItemsSubcription: Subscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>
  ) {}

  initIngresoEgresoListener() {
    this.ingresoEgresoListerSubcription = this.store
      .select("auth")
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.ingresoEgresoItems(auth.user.uid);
      });
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubcription = this.afDB
      .collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...(doc.payload.doc.data() as {})
            };
          });
        })
      )
      .subscribe((coleccion: any[]) => {
        this.store.dispatch(new SetItemsAction(coleccion));
      });
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {
    const user = this.authService.getUsuario();

    return this.afDB
      .doc(`${user.uid}/ingreso-egreso`)
      .collection("items")
      .add({ ...ingresoEgreso });
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.authService.getUsuario();

    return this.afDB.doc(`${user.uid}/ingreso-egreso/items/${uid}`).delete();
  }

  cancelarSubcriptions() {
    this.ingresoEgresoListerSubcription.unsubscribe();
    this.ingresoEgresoItemsSubcription.unsubscribe();
  }
}
