import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISygTypeSourceFinancement, SygTypeSourceFinancement } from 'app/shared/model/planpassationms/syg-type-source-financement.model';
import { SygTypeSourceFinancementService } from './syg-type-source-financement.service';
import { SygTypeSourceFinancementComponent } from './syg-type-source-financement.component';
import { SygTypeSourceFinancementDetailComponent } from './syg-type-source-financement-detail.component';
import { SygTypeSourceFinancementUpdateComponent } from './syg-type-source-financement-update.component';

@Injectable({ providedIn: 'root' })
export class SygTypeSourceFinancementResolve implements Resolve<ISygTypeSourceFinancement> {
  constructor(private service: SygTypeSourceFinancementService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISygTypeSourceFinancement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sygTypeSourceFinancement: HttpResponse<SygTypeSourceFinancement>) => {
          if (sygTypeSourceFinancement.body) {
            return of(sygTypeSourceFinancement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SygTypeSourceFinancement());
  }
}

export const sygTypeSourceFinancementRoute: Routes = [
  {
    path: '',
    component: SygTypeSourceFinancementComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewaysigmapApp.planpassationmsSygTypeSourceFinancement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SygTypeSourceFinancementDetailComponent,
    resolve: {
      sygTypeSourceFinancement: SygTypeSourceFinancementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygTypeSourceFinancement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SygTypeSourceFinancementUpdateComponent,
    resolve: {
      sygTypeSourceFinancement: SygTypeSourceFinancementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygTypeSourceFinancement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SygTypeSourceFinancementUpdateComponent,
    resolve: {
      sygTypeSourceFinancement: SygTypeSourceFinancementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygTypeSourceFinancement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
