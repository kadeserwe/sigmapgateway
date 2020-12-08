import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBailleurs } from 'app/shared/model/bailleurs/bailleurs.model';

type EntityResponseType = HttpResponse<IBailleurs>;
type EntityArrayResponseType = HttpResponse<IBailleurs[]>;

@Injectable({ providedIn: 'root' })
export class BailleursService {
  public resourceUrl = SERVER_API_URL + 'services/bailleurs/api/bailleurs';

  constructor(protected http: HttpClient) {}

  create(bailleurs: IBailleurs): Observable<EntityResponseType> {
    return this.http.post<IBailleurs>(this.resourceUrl, bailleurs, { observe: 'response' });
  }

  update(bailleurs: IBailleurs): Observable<EntityResponseType> {
    return this.http.put<IBailleurs>(this.resourceUrl, bailleurs, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBailleurs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBailleurs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
