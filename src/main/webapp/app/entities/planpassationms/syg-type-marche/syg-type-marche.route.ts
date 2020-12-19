import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISygTypeMarche, SygTypeMarche } from 'app/shared/model/planpassationms/syg-type-marche.model';
import { SygTypeMarcheService } from './syg-type-marche.service';
import { SygTypeMarcheComponent } from './syg-type-marche.component';
import { SygTypeMarcheDetailComponent } from './syg-type-marche-detail.component';
import { SygTypeMarcheUpdateComponent } from './syg-type-marche-update.component';

@Injectable({ providedIn: 'root' })
export class SygTypeMarcheResolve implements Resolve<ISygTypeMarche> {
  constructor(private service: SygTypeMarcheService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISygTypeMarche> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sygTypeMarche: HttpResponse<SygTypeMarche>) => {
          if (sygTypeMarche.body) {
            return of(sygTypeMarche.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SygTypeMarche());
  }
}

export const sygTypeMarcheRoute: Routes = [
  {
    path: '',
    component: SygTypeMarcheComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewaysigmapApp.planpassationmsSygTypeMarche.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SygTypeMarcheDetailComponent,
    resolve: {
      sygTypeMarche: SygTypeMarcheResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygTypeMarche.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SygTypeMarcheUpdateComponent,
    resolve: {
      sygTypeMarche: SygTypeMarcheResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygTypeMarche.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SygTypeMarcheUpdateComponent,
    resolve: {
      sygTypeMarche: SygTypeMarcheResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygTypeMarche.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
