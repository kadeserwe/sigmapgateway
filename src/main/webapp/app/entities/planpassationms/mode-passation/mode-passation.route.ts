import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IModePassation, ModePassation } from 'app/shared/model/planpassationms/mode-passation.model';
import { ModePassationService } from './mode-passation.service';
import { ModePassationComponent } from './mode-passation.component';
import { ModePassationDetailComponent } from './mode-passation-detail.component';
import { ModePassationUpdateComponent } from './mode-passation-update.component';

@Injectable({ providedIn: 'root' })
export class ModePassationResolve implements Resolve<IModePassation> {
  constructor(private service: ModePassationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IModePassation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((modePassation: HttpResponse<ModePassation>) => {
          if (modePassation.body) {
            return of(modePassation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ModePassation());
  }
}

export const modePassationRoute: Routes = [
  {
    path: '',
    component: ModePassationComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsModePassation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ModePassationDetailComponent,
    resolve: {
      modePassation: ModePassationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsModePassation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ModePassationUpdateComponent,
    resolve: {
      modePassation: ModePassationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsModePassation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ModePassationUpdateComponent,
    resolve: {
      modePassation: ModePassationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsModePassation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
