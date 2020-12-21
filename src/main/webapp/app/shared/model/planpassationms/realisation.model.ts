import { Moment } from 'moment';

export interface IRealisation {
  id?: number;
  libelle?: string;
  dateAttribution?: Moment;
  delaiexecution?: number;
  objet?: string;
  montant?: number;
  examenDncmp?: number;
  examenPtf?: number;
  chapitreImputation?: string;
  autorisationEngagement?: string;
  dateReceptionDossier?: Moment;
  dateNonObjection?: Moment;
  dateAutorisation?: Moment;
  dateRecepNonObjection?: Moment;
  dateRecepDossCorrige?: Moment;
  datePubParPrmp?: Moment;
  dateOuverturePlis?: Moment;
  dateRecepNonObjectOcmp?: Moment;
  dateRecepRapportEva?: Moment;
  dateRecepNonObjectPtf?: Moment;
  dateExamenJuridique?: Moment;
  dateNotifContrat?: Moment;
  dateApprobationContrat?: Moment;
  planPassationId?: number;
}

export class Realisation implements IRealisation {
  constructor(
    public id?: number,
    public libelle?: string,
    public dateAttribution?: Moment,
    public delaiexecution?: number,
    public objet?: string,
    public montant?: number,
    public examenDncmp?: number,
    public examenPtf?: number,
    public chapitreImputation?: string,
    public autorisationEngagement?: string,
    public dateReceptionDossier?: Moment,
    public dateNonObjection?: Moment,
    public dateAutorisation?: Moment,
    public dateRecepNonObjection?: Moment,
    public dateRecepDossCorrige?: Moment,
    public datePubParPrmp?: Moment,
    public dateOuverturePlis?: Moment,
    public dateRecepNonObjectOcmp?: Moment,
    public dateRecepRapportEva?: Moment,
    public dateRecepNonObjectPtf?: Moment,
    public dateExamenJuridique?: Moment,
    public dateNotifContrat?: Moment,
    public dateApprobationContrat?: Moment,
    public planPassationId?: number
  ) {}
}
