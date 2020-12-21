import { Moment } from 'moment';

export interface IHistorique {
  id?: number;
  dateRejet?: Moment;
  dateRjet2?: Moment;
  dateMiseValidation?: Moment;
  commentaireRejet?: string;
  commentaireMiseValidation?: string;
  fichierMiseValidationContentType?: string;
  fichierMiseValidation?: any;
  fichierRejetContentType?: string;
  fichierRejet?: any;
  etat?: string;
  etat2?: string;
  commentaireRejet2?: string;
  fichierRejet2ContentType?: string;
  fichierRejet2?: any;
  planPassationId?: number;
}

export class Historique implements IHistorique {
  constructor(
    public id?: number,
    public dateRejet?: Moment,
    public dateRjet2?: Moment,
    public dateMiseValidation?: Moment,
    public commentaireRejet?: string,
    public commentaireMiseValidation?: string,
    public fichierMiseValidationContentType?: string,
    public fichierMiseValidation?: any,
    public fichierRejetContentType?: string,
    public fichierRejet?: any,
    public etat?: string,
    public etat2?: string,
    public commentaireRejet2?: string,
    public fichierRejet2ContentType?: string,
    public fichierRejet2?: any,
    public planPassationId?: number
  ) {}
}
