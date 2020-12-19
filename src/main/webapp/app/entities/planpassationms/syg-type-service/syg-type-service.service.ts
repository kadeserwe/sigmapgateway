import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISygTypeService } from 'app/shared/model/planpassationms/syg-type-service.model';

type EntityResponseType = HttpResponse<ISygTypeService>;
type EntityArrayResponseType = HttpResponse<ISygTypeService[]>;

@Injectable({ providedIn: 'root' })
export class SygTypeServiceService {
  public resourceUrl = SERVER_API_URL + 'services/planpassationms/api/syg-type-services';

  constructor(protected http: HttpClient) {}

  create(sygTypeService: ISygTypeService): Observable<EntityResponseType> {
    return this.http.post<ISygTypeService>(this.resourceUrl, sygTypeService, { observe: 'response' });
  }

  update(sygTypeService: ISygTypeService): Observable<EntityResponseType> {
    return this.http.put<ISygTypeService>(this.resourceUrl, sygTypeService, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISygTypeService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISygTypeService[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
