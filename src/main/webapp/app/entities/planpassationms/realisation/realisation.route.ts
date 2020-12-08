import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRealisation, Realisation } from 'app/shared/model/planpassationms/realisation.model';
import { RealisationService } from './realisation.service';
import { RealisationComponent } from './realisation.component';
import { RealisationDetailComponent } from './realisation-detail.component';
import { RealisationUpdateComponent } from './realisation-update.component';

@Injectable({ providedIn: 'root' })
export class RealisationResolve implements Resolve<IRealisation> {
  constructor(private service: RealisationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRealisation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((realisation: HttpResponse<Realisation>) => {
          if (realisation.body) {
            return of(realisation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Realisation());
  }
}

export const realisationRoute: Routes = [
  {
    path: '',
    component: RealisationComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewaysigmapApp.planpassationmsRealisation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RealisationDetailComponent,
    resolve: {
      realisation: RealisationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsRealisation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RealisationUpdateComponent,
    resolve: {
      realisation: RealisationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsRealisation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RealisationUpdateComponent,
    resolve: {
      realisation: RealisationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsRealisation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
