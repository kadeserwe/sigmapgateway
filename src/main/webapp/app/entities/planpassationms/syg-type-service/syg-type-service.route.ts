import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISygTypeService, SygTypeService } from 'app/shared/model/planpassationms/syg-type-service.model';
import { SygTypeServiceService } from './syg-type-service.service';
import { SygTypeServiceComponent } from './syg-type-service.component';
import { SygTypeServiceDetailComponent } from './syg-type-service-detail.component';
import { SygTypeServiceUpdateComponent } from './syg-type-service-update.component';

@Injectable({ providedIn: 'root' })
export class SygTypeServiceResolve implements Resolve<ISygTypeService> {
  constructor(private service: SygTypeServiceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISygTypeService> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sygTypeService: HttpResponse<SygTypeService>) => {
          if (sygTypeService.body) {
            return of(sygTypeService.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SygTypeService());
  }
}

export const sygTypeServiceRoute: Routes = [
  {
    path: '',
    component: SygTypeServiceComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewaysigmapApp.planpassationmsSygTypeService.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SygTypeServiceDetailComponent,
    resolve: {
      sygTypeService: SygTypeServiceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygTypeService.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SygTypeServiceUpdateComponent,
    resolve: {
      sygTypeService: SygTypeServiceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygTypeService.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SygTypeServiceUpdateComponent,
    resolve: {
      sygTypeService: SygTypeServiceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaysigmapApp.planpassationmsSygTypeService.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
