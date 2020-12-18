import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRealisation } from 'app/shared/model/planpassationms/realisation.model';

type EntityResponseType = HttpResponse<IRealisation>;
type EntityArrayResponseType = HttpResponse<IRealisation[]>;

@Injectable({ providedIn: 'root' })
export class RealisationService {
  public resourceUrl = SERVER_API_URL + 'services/planpassationms/api/realisations';

  constructor(protected http: HttpClient) {}

  create(realisation: IRealisation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(realisation);
    return this.http
      .post<IRealisation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(realisation: IRealisation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(realisation);
    return this.http
      .put<IRealisation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRealisation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRealisation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(realisation: IRealisation): IRealisation {
    const copy: IRealisation = Object.assign({}, realisation, {
      dateAttribution:
        realisation.dateAttribution && realisation.dateAttribution.isValid() ? realisation.dateAttribution.format(DATE_FORMAT) : undefined,
      dateReceptionDossier:
        realisation.dateReceptionDossier && realisation.dateReceptionDossier.isValid()
          ? realisation.dateReceptionDossier.format(DATE_FORMAT)
          : undefined,
      dateNonObjection:
        realisation.dateNonObjection && realisation.dateNonObjection.isValid()
          ? realisation.dateNonObjection.format(DATE_FORMAT)
          : undefined,
      dateAutorisation:
        realisation.dateAutorisation && realisation.dateAutorisation.isValid()
          ? realisation.dateAutorisation.format(DATE_FORMAT)
          : undefined,
      dateRecepNonObjection:
        realisation.dateRecepNonObjection && realisation.dateRecepNonObjection.isValid()
          ? realisation.dateRecepNonObjection.format(DATE_FORMAT)
          : undefined,
      dateRecepDossCorrige:
        realisation.dateRecepDossCorrige && realisation.dateRecepDossCorrige.isValid()
          ? realisation.dateRecepDossCorrige.format(DATE_FORMAT)
          : undefined,
      datePubParPrmp:
        realisation.datePubParPrmp && realisation.datePubParPrmp.isValid() ? realisation.datePubParPrmp.format(DATE_FORMAT) : undefined,
      dateOuverturePlis:
        realisation.dateOuverturePlis && realisation.dateOuverturePlis.isValid()
          ? realisation.dateOuverturePlis.format(DATE_FORMAT)
          : undefined,
      dateRecepNonObjectOcmp:
        realisation.dateRecepNonObjectOcmp && realisation.dateRecepNonObjectOcmp.isValid()
          ? realisation.dateRecepNonObjectOcmp.format(DATE_FORMAT)
          : undefined,
      dateRecepRapportEva:
        realisation.dateRecepRapportEva && realisation.dateRecepRapportEva.isValid()
          ? realisation.dateRecepRapportEva.format(DATE_FORMAT)
          : undefined,
      dateRecepNonObjectPtf:
        realisation.dateRecepNonObjectPtf && realisation.dateRecepNonObjectPtf.isValid()
          ? realisation.dateRecepNonObjectPtf.format(DATE_FORMAT)
          : undefined,
      dateExamenJuridique:
        realisation.dateExamenJuridique && realisation.dateExamenJuridique.isValid()
          ? realisation.dateExamenJuridique.format(DATE_FORMAT)
          : undefined,
      dateNotifContrat:
        realisation.dateNotifContrat && realisation.dateNotifContrat.isValid()
          ? realisation.dateNotifContrat.format(DATE_FORMAT)
          : undefined,
      dateApprobationContrat:
        realisation.dateApprobationContrat && realisation.dateApprobationContrat.isValid()
          ? realisation.dateApprobationContrat.format(DATE_FORMAT)
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateAttribution = res.body.dateAttribution ? moment(res.body.dateAttribution) : undefined;
      res.body.dateReceptionDossier = res.body.dateReceptionDossier ? moment(res.body.dateReceptionDossier) : undefined;
      res.body.dateNonObjection = res.body.dateNonObjection ? moment(res.body.dateNonObjection) : undefined;
      res.body.dateAutorisation = res.body.dateAutorisation ? moment(res.body.dateAutorisation) : undefined;
      res.body.dateRecepNonObjection = res.body.dateRecepNonObjection ? moment(res.body.dateRecepNonObjection) : undefined;
      res.body.dateRecepDossCorrige = res.body.dateRecepDossCorrige ? moment(res.body.dateRecepDossCorrige) : undefined;
      res.body.datePubParPrmp = res.body.datePubParPrmp ? moment(res.body.datePubParPrmp) : undefined;
      res.body.dateOuverturePlis = res.body.dateOuverturePlis ? moment(res.body.dateOuverturePlis) : undefined;
      res.body.dateRecepNonObjectOcmp = res.body.dateRecepNonObjectOcmp ? moment(res.body.dateRecepNonObjectOcmp) : undefined;
      res.body.dateRecepRapportEva = res.body.dateRecepRapportEva ? moment(res.body.dateRecepRapportEva) : undefined;
      res.body.dateRecepNonObjectPtf = res.body.dateRecepNonObjectPtf ? moment(res.body.dateRecepNonObjectPtf) : undefined;
      res.body.dateExamenJuridique = res.body.dateExamenJuridique ? moment(res.body.dateExamenJuridique) : undefined;
      res.body.dateNotifContrat = res.body.dateNotifContrat ? moment(res.body.dateNotifContrat) : undefined;
      res.body.dateApprobationContrat = res.body.dateApprobationContrat ? moment(res.body.dateApprobationContrat) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((realisation: IRealisation) => {
        realisation.dateAttribution = realisation.dateAttribution ? moment(realisation.dateAttribution) : undefined;
        realisation.dateReceptionDossier = realisation.dateReceptionDossier ? moment(realisation.dateReceptionDossier) : undefined;
        realisation.dateNonObjection = realisation.dateNonObjection ? moment(realisation.dateNonObjection) : undefined;
        realisation.dateAutorisation = realisation.dateAutorisation ? moment(realisation.dateAutorisation) : undefined;
        realisation.dateRecepNonObjection = realisation.dateRecepNonObjection ? moment(realisation.dateRecepNonObjection) : undefined;
        realisation.dateRecepDossCorrige = realisation.dateRecepDossCorrige ? moment(realisation.dateRecepDossCorrige) : undefined;
        realisation.datePubParPrmp = realisation.datePubParPrmp ? moment(realisation.datePubParPrmp) : undefined;
        realisation.dateOuverturePlis = realisation.dateOuverturePlis ? moment(realisation.dateOuverturePlis) : undefined;
        realisation.dateRecepNonObjectOcmp = realisation.dateRecepNonObjectOcmp ? moment(realisation.dateRecepNonObjectOcmp) : undefined;
        realisation.dateRecepRapportEva = realisation.dateRecepRapportEva ? moment(realisation.dateRecepRapportEva) : undefined;
        realisation.dateRecepNonObjectPtf = realisation.dateRecepNonObjectPtf ? moment(realisation.dateRecepNonObjectPtf) : undefined;
        realisation.dateExamenJuridique = realisation.dateExamenJuridique ? moment(realisation.dateExamenJuridique) : undefined;
        realisation.dateNotifContrat = realisation.dateNotifContrat ? moment(realisation.dateNotifContrat) : undefined;
        realisation.dateApprobationContrat = realisation.dateApprobationContrat ? moment(realisation.dateApprobationContrat) : undefined;
      });
    }
    return res;
  }
}
