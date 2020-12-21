import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHistorique, Historique } from 'app/shared/model/planpassationms/historique.model';
import { HistoriqueService } from './historique.service';
import { HistoriqueComponent } from './historique.component';
import { HistoriqueDetailComponent } from './historique-detail.component';
import { HistoriqueUpdateComponent } from './historique-update.component';

@Injectable({ providedIn: 'root' })
export class HistoriqueResolve implements Resolve<IHistorique> {
  constructor(private service: HistoriqueService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistorique> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((historique: HttpResponse<Historique>) => {
          if (historique.body) {
            return of(historique.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Historique());
  }
}

export const historiqueRoute: Routes = [
  {
    path: '',
    component: HistoriqueComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewaysigmapApp.planpassationmsHistorique.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HistoriqueDetailComponent,
    resolve: {
      historique: HistoriqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsHistorique.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HistoriqueUpdateComponent,
    resolve: {
      historique: HistoriqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsHistorique.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HistoriqueUpdateComponent,
    resolve: {
      historique: HistoriqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsHistorique.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
