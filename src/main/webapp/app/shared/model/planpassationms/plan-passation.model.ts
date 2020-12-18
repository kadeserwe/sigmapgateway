import { Moment } from 'moment';

export interface IPlanPassation {
  id?: number;
  dateDebut?: Moment;
  dateFin?: Moment;
  commentaire?: string;
  annee?: number;
  dateCreation?: Moment;
  dateMiseValidation?: Moment;
  dateValidation?: Moment;
  statut?: string;
  commentaireMiseEnValidationAC?: string;
  referenceMiseValidationAC?: string;
  fichierMiseValidationACContentType?: string;
  fichierMiseValidationAC?: any;
  dateMiseEnValidationCcmp?: Moment;
  fichierMiseValidationCcmpContentType?: string;
  fichierMiseValidationCcmp?: any;
  referenceMiseValidationCcmp?: string;
  dateValidation1?: Moment;
  commentaireValidation?: string;
  referenceValidation?: string;
  fichierValidationContentType?: string;
  fichierValidation?: any;
  dateValidation2?: Moment;
  dateRejet?: Moment;
  datePublication?: Moment;
  commentairePublication?: string;
}

export class PlanPassation implements IPlanPassation {
  constructor(
    public id?: number,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public commentaire?: string,
    public annee?: number,
    public dateCreation?: Moment,
    public dateMiseValidation?: Moment,
    public dateValidation?: Moment,
    public statut?: string,
    public commentaireMiseEnValidationAC?: string,
    public referenceMiseValidationAC?: string,
    public fichierMiseValidationACContentType?: string,
    public fichierMiseValidationAC?: any,
    public dateMiseEnValidationCcmp?: Moment,
    public fichierMiseValidationCcmpContentType?: string,
    public fichierMiseValidationCcmp?: any,
    public referenceMiseValidationCcmp?: string,
    public dateValidation1?: Moment,
    public commentaireValidation?: string,
    public referenceValidation?: string,
    public fichierValidationContentType?: string,
    public fichierValidation?: any,
    public dateValidation2?: Moment,
    public dateRejet?: Moment,
    public datePublication?: Moment,
    public commentairePublication?: string
  ) {}
}
