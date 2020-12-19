export interface ISygTypeService {
  id?: number;
  libelle?: string;
}

export class SygTypeService implements ISygTypeService {
  constructor(public id?: number, public libelle?: string) {}
}
