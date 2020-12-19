export interface ISygSourceFinancement {
  id?: number;
  libelle?: string;
  sygTypeSourceFinancementLibelle?: string;
  sygTypeSourceFinancementId?: number;
}

export class SygSourceFinancement implements ISygSourceFinancement {
  constructor(
    public id?: number,
    public libelle?: string,
    public sygTypeSourceFinancementLibelle?: string,
    public sygTypeSourceFinancementId?: number
  ) {}
}
