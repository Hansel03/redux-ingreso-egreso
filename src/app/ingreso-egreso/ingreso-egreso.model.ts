export class IngresoEgresoModel {
  descripcion: string;
  monto: number;
  tipo: string;
  uid?: string;

  constructor(obj: DataObj) {
    this.descripcion = (obj && obj.descripcion) || null;
    this.monto = (obj && obj.monto) || 0;
    this.tipo = (obj && obj.tipo) || null;
    // this.uid = (obj && obj.uid) || null;
  }
}

interface DataObj {
  descripcion: string;
  monto: number;
  tipo: string;
  uid?: string;
}
