export interface ISygService {
  id?: number;
  code?: string;
  libelle?: string;
  description?: string;
  sygTypeServiceLibelle?: string;
  sygTypeServiceId?: number;
}

export class SygService implements ISygService {
  constructor(
    public id?: number,
    public code?: string,
    public libelle?: string,
    public description?: string,
    public sygTypeServiceLibelle?: string,
    public sygTypeServiceId?: number
  ) {}
}
