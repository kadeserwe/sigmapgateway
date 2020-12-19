export interface ISygTypeMarche {
  id?: number;
  code?: string;
  libelle?: string;
  description?: string;
}

export class SygTypeMarche implements ISygTypeMarche {
  constructor(public id?: number, public code?: string, public libelle?: string, public description?: string) {}
}
