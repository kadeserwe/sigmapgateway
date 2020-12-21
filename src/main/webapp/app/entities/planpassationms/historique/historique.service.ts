import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHistorique } from 'app/shared/model/planpassationms/historique.model';

type EntityResponseType = HttpResponse<IHistorique>;
type EntityArrayResponseType = HttpResponse<IHistorique[]>;

@Injectable({ providedIn: 'root' })
export class HistoriqueService {
  public resourceUrl = SERVER_API_URL + 'services/planpassationms/api/historiques';

  constructor(protected http: HttpClient) {}

  create(historique: IHistorique): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historique);
    return this.http
      .post<IHistorique>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(historique: IHistorique): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historique);
    return this.http
      .put<IHistorique>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHistorique>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHistorique[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(historique: IHistorique): IHistorique {
    const copy: IHistorique = Object.assign({}, historique, {
      dateRejet: historique.dateRejet && historique.dateRejet.isValid() ? historique.dateRejet.format(DATE_FORMAT) : undefined,
      dateRjet2: historique.dateRjet2 && historique.dateRjet2.isValid() ? historique.dateRjet2.format(DATE_FORMAT) : undefined,
      dateMiseValidation:
        historique.dateMiseValidation && historique.dateMiseValidation.isValid()
          ? historique.dateMiseValidation.format(DATE_FORMAT)
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateRejet = res.body.dateRejet ? moment(res.body.dateRejet) : undefined;
      res.body.dateRjet2 = res.body.dateRjet2 ? moment(res.body.dateRjet2) : undefined;
      res.body.dateMiseValidation = res.body.dateMiseValidation ? moment(res.body.dateMiseValidation) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((historique: IHistorique) => {
        historique.dateRejet = historique.dateRejet ? moment(historique.dateRejet) : undefined;
        historique.dateRjet2 = historique.dateRjet2 ? moment(historique.dateRjet2) : undefined;
        historique.dateMiseValidation = historique.dateMiseValidation ? moment(historique.dateMiseValidation) : undefined;
      });
    }
    return res;
  }
}
