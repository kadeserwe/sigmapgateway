import { Moment } from 'moment';

export interface IParamDate {
  id?: number;
  dateCreat?: Moment;
}

export class ParamDate implements IParamDate {
  constructor(public id?: number, public dateCreat?: Moment) {}
}
