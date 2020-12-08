import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IParamDate, ParamDate } from 'app/shared/model/planpassationms/param-date.model';
import { ParamDateService } from './param-date.service';
import { ParamDateComponent } from './param-date.component';
import { ParamDateDetailComponent } from './param-date-detail.component';
import { ParamDateUpdateComponent } from './param-date-update.component';

@Injectable({ providedIn: 'root' })
export class ParamDateResolve implements Resolve<IParamDate> {
  constructor(private service: ParamDateService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParamDate> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((paramDate: HttpResponse<ParamDate>) => {
          if (paramDate.body) {
            return of(paramDate.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ParamDate());
  }
}

export const paramDateRoute: Routes = [
  {
    path: '',
    component: ParamDateComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewaysigmapApp.planpassationmsParamDate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParamDateDetailComponent,
    resolve: {
      paramDate: ParamDateResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsParamDate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParamDateUpdateComponent,
    resolve: {
      paramDate: ParamDateResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsParamDate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParamDateUpdateComponent,
    resolve: {
      paramDate: ParamDateResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsParamDate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
