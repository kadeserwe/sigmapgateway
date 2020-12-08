import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPlanPassation, PlanPassation } from 'app/shared/model/planpassationms/plan-passation.model';
import { PlanPassationService } from './plan-passation.service';
import { PlanPassationComponent } from './plan-passation.component';
import { PlanPassationDetailComponent } from './plan-passation-detail.component';
import { PlanPassationUpdateComponent } from './plan-passation-update.component';

@Injectable({ providedIn: 'root' })
export class PlanPassationResolve implements Resolve<IPlanPassation> {
  constructor(private service: PlanPassationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlanPassation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((planPassation: HttpResponse<PlanPassation>) => {
          if (planPassation.body) {
            return of(planPassation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PlanPassation());
  }
}

export const planPassationRoute: Routes = [
  {
    path: '',
    component: PlanPassationComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewaysigmapApp.planpassationmsPlanPassation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PlanPassationDetailComponent,
    resolve: {
      planPassation: PlanPassationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsPlanPassation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlanPassationUpdateComponent,
    resolve: {
      planPassation: PlanPassationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsPlanPassation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlanPassationUpdateComponent,
    resolve: {
      planPassation: PlanPassationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsPlanPassation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
