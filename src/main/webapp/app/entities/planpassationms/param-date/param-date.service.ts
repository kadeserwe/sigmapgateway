import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IParamDate } from 'app/shared/model/planpassationms/param-date.model';

type EntityResponseType = HttpResponse<IParamDate>;
type EntityArrayResponseType = HttpResponse<IParamDate[]>;

@Injectable({ providedIn: 'root' })
export class ParamDateService {
  public resourceUrl = SERVER_API_URL + 'services/planpassationms/api/param-dates';

  constructor(protected http: HttpClient) {}

  create(paramDate: IParamDate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paramDate);
    return this.http
      .post<IParamDate>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(paramDate: IParamDate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paramDate);
    return this.http
      .put<IParamDate>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IParamDate>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IParamDate[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(paramDate: IParamDate): IParamDate {
    const copy: IParamDate = Object.assign({}, paramDate, {
      dateCreat: paramDate.dateCreat && paramDate.dateCreat.isValid() ? paramDate.dateCreat.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCreat = res.body.dateCreat ? moment(res.body.dateCreat) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((paramDate: IParamDate) => {
        paramDate.dateCreat = paramDate.dateCreat ? moment(paramDate.dateCreat) : undefined;
      });
    }
    return res;
  }
}
