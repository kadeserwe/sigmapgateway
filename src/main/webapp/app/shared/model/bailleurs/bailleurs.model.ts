export interface IBailleurs {
  id?: number;
  libelle?: string;
}

export class Bailleurs implements IBailleurs {
  constructor(public id?: number, public libelle?: string) {}
}
