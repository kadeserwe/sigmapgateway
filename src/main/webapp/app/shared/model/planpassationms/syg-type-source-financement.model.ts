export interface ISygTypeSourceFinancement {
  id?: number;
  libelle?: string;
}

export class SygTypeSourceFinancement implements ISygTypeSourceFinancement {
  constructor(public id?: number, public libelle?: string) {}
}
