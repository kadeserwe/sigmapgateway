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
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateAttribution = res.body.dateAttribution ? moment(res.body.dateAttribution) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((realisation: IRealisation) => {
        realisation.dateAttribution = realisation.dateAttribution ? moment(realisation.dateAttribution) : undefined;
      });
    }
    return res;
  }
}
