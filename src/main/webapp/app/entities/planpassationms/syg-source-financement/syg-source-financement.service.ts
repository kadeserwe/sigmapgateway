import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISygSourceFinancement } from 'app/shared/model/planpassationms/syg-source-financement.model';

type EntityResponseType = HttpResponse<ISygSourceFinancement>;
type EntityArrayResponseType = HttpResponse<ISygSourceFinancement[]>;

@Injectable({ providedIn: 'root' })
export class SygSourceFinancementService {
  public resourceUrl = SERVER_API_URL + 'services/planpassationms/api/syg-source-financements';

  constructor(protected http: HttpClient) {}

  create(sygSourceFinancement: ISygSourceFinancement): Observable<EntityResponseType> {
    return this.http.post<ISygSourceFinancement>(this.resourceUrl, sygSourceFinancement, { observe: 'response' });
  }

  update(sygSourceFinancement: ISygSourceFinancement): Observable<EntityResponseType> {
    return this.http.put<ISygSourceFinancement>(this.resourceUrl, sygSourceFinancement, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISygSourceFinancement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISygSourceFinancement[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
