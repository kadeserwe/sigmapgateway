import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISygTypeSourceFinancement } from 'app/shared/model/planpassationms/syg-type-source-financement.model';

type EntityResponseType = HttpResponse<ISygTypeSourceFinancement>;
type EntityArrayResponseType = HttpResponse<ISygTypeSourceFinancement[]>;

@Injectable({ providedIn: 'root' })
export class SygTypeSourceFinancementService {
  public resourceUrl = SERVER_API_URL + 'services/planpassationms/api/syg-type-source-financements';

  constructor(protected http: HttpClient) {}

  create(sygTypeSourceFinancement: ISygTypeSourceFinancement): Observable<EntityResponseType> {
    return this.http.post<ISygTypeSourceFinancement>(this.resourceUrl, sygTypeSourceFinancement, { observe: 'response' });
  }

  update(sygTypeSourceFinancement: ISygTypeSourceFinancement): Observable<EntityResponseType> {
    return this.http.put<ISygTypeSourceFinancement>(this.resourceUrl, sygTypeSourceFinancement, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISygTypeSourceFinancement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISygTypeSourceFinancement[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
