import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlanPassation } from 'app/shared/model/planpassationms/plan-passation.model';

type EntityResponseType = HttpResponse<IPlanPassation>;
type EntityArrayResponseType = HttpResponse<IPlanPassation[]>;

@Injectable({ providedIn: 'root' })
export class PlanPassationService {
  public resourceUrl = SERVER_API_URL + 'services/planpassationms/api/plan-passations';

  constructor(protected http: HttpClient) {}

  create(planPassation: IPlanPassation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planPassation);
    return this.http
      .post<IPlanPassation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(planPassation: IPlanPassation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planPassation);
    return this.http
      .put<IPlanPassation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlanPassation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlanPassation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(planPassation: IPlanPassation): IPlanPassation {
    const copy: IPlanPassation = Object.assign({}, planPassation, {
      dateDebut: planPassation.dateDebut && planPassation.dateDebut.isValid() ? planPassation.dateDebut.format(DATE_FORMAT) : undefined,
      dateFin: planPassation.dateFin && planPassation.dateFin.isValid() ? planPassation.dateFin.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut ? moment(res.body.dateDebut) : undefined;
      res.body.dateFin = res.body.dateFin ? moment(res.body.dateFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((planPassation: IPlanPassation) => {
        planPassation.dateDebut = planPassation.dateDebut ? moment(planPassation.dateDebut) : undefined;
        planPassation.dateFin = planPassation.dateFin ? moment(planPassation.dateFin) : undefined;
      });
    }
    return res;
  }
}
