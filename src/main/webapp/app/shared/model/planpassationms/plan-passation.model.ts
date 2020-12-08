import { Moment } from 'moment';

export interface IPlanPassation {
  id?: number;
  dateDebut?: Moment;
  dateFin?: Moment;
  commentaire?: string;
}

export class PlanPassation implements IPlanPassation {
  constructor(public id?: number, public dateDebut?: Moment, public dateFin?: Moment, public commentaire?: string) {}
}
