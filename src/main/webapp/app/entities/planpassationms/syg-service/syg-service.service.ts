import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISygService } from 'app/shared/model/planpassationms/syg-service.model';

type EntityResponseType = HttpResponse<ISygService>;
type EntityArrayResponseType = HttpResponse<ISygService[]>;

@Injectable({ providedIn: 'root' })
export class SygServiceService {
  public resourceUrl = SERVER_API_URL + 'services/planpassationms/api/syg-services';

  constructor(protected http: HttpClient) {}

  create(sygService: ISygService): Observable<EntityResponseType> {
    return this.http.post<ISygService>(this.resourceUrl, sygService, { observe: 'response' });
  }

  update(sygService: ISygService): Observable<EntityResponseType> {
    return this.http.put<ISygService>(this.resourceUrl, sygService, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISygService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISygService[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
