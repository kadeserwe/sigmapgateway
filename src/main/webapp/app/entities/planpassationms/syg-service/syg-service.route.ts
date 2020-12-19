import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISygService, SygService } from 'app/shared/model/planpassationms/syg-service.model';
import { SygServiceService } from './syg-service.service';
import { SygServiceComponent } from './syg-service.component';
import { SygServiceDetailComponent } from './syg-service-detail.component';
import { SygServiceUpdateComponent } from './syg-service-update.component';

@Injectable({ providedIn: 'root' })
export class SygServiceResolve implements Resolve<ISygService> {
  constructor(private service: SygServiceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISygService> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sygService: HttpResponse<SygService>) => {
          if (sygService.body) {
            return of(sygService.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SygService());
  }
}

export const sygServiceRoute: Routes = [
  {
    path: '',
    component: SygServiceComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewaysigmapApp.planpassationmsSygService.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SygServiceDetailComponent,
    resolve: {
      sygService: SygServiceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygService.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SygServiceUpdateComponent,
    resolve: {
      sygService: SygServiceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygService.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SygServiceUpdateComponent,
    resolve: {
      sygService: SygServiceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygService.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
