import { Moment } from 'moment';

export interface IRealisation {
  id?: number;
  libelle?: string;
  dateAttribution?: Moment;
  delaiexecution?: number;
  planPassationId?: number;
}

export class Realisation implements IRealisation {
  constructor(
    public id?: number,
    public libelle?: string,
    public dateAttribution?: Moment,
    public delaiexecution?: number,
    public planPassationId?: number
  ) {}
}
