import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISygTypeMarche } from 'app/shared/model/planpassationms/syg-type-marche.model';

type EntityResponseType = HttpResponse<ISygTypeMarche>;
type EntityArrayResponseType = HttpResponse<ISygTypeMarche[]>;

@Injectable({ providedIn: 'root' })
export class SygTypeMarcheService {
  public resourceUrl = SERVER_API_URL + 'services/planpassationms/api/syg-type-marches';

  constructor(protected http: HttpClient) {}

  create(sygTypeMarche: ISygTypeMarche): Observable<EntityResponseType> {
    return this.http.post<ISygTypeMarche>(this.resourceUrl, sygTypeMarche, { observe: 'response' });
  }

  update(sygTypeMarche: ISygTypeMarche): Observable<EntityResponseType> {
    return this.http.put<ISygTypeMarche>(this.resourceUrl, sygTypeMarche, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISygTypeMarche>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISygTypeMarche[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
