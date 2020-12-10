export interface IModePassation {
  id?: number;
  libelle?: string;
  code?: string;
  description?: string;
}

export class ModePassation implements IModePassation {
  constructor(public id?: number, public libelle?: string, public code?: string, public description?: string) {}
}
