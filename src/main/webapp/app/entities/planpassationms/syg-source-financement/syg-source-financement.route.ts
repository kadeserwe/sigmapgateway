import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISygSourceFinancement, SygSourceFinancement } from 'app/shared/model/planpassationms/syg-source-financement.model';
import { SygSourceFinancementService } from './syg-source-financement.service';
import { SygSourceFinancementComponent } from './syg-source-financement.component';
import { SygSourceFinancementDetailComponent } from './syg-source-financement-detail.component';
import { SygSourceFinancementUpdateComponent } from './syg-source-financement-update.component';

@Injectable({ providedIn: 'root' })
export class SygSourceFinancementResolve implements Resolve<ISygSourceFinancement> {
  constructor(private service: SygSourceFinancementService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISygSourceFinancement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sygSourceFinancement: HttpResponse<SygSourceFinancement>) => {
          if (sygSourceFinancement.body) {
            return of(sygSourceFinancement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SygSourceFinancement());
  }
}

export const sygSourceFinancementRoute: Routes = [
  {
    path: '',
    component: SygSourceFinancementComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewaysigmapApp.planpassationmsSygSourceFinancement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SygSourceFinancementDetailComponent,
    resolve: {
      sygSourceFinancement: SygSourceFinancementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygSourceFinancement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SygSourceFinancementUpdateComponent,
    resolve: {
      sygSourceFinancement: SygSourceFinancementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygSourceFinancement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SygSourceFinancementUpdateComponent,
    resolve: {
      sygSourceFinancement: SygSourceFinancementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygSourceFinancement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
