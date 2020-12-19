import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaysigmapSharedModule } from 'app/shared/shared.module';
import { SygTypeServiceComponent } from './syg-type-service.component';
import { SygTypeServiceDetailComponent } from './syg-type-service-detail.component';
import { SygTypeServiceUpdateComponent } from './syg-type-service-update.component';
import { SygTypeServiceDeleteDialogComponent } from './syg-type-service-delete-dialog.component';
import { sygTypeServiceRoute } from './syg-type-service.route';

@NgModule({
  imports: [GatewaysigmapSharedModule, RouterModule.forChild(sygTypeServiceRoute)],
  declarations: [
    SygTypeServiceComponent,
    SygTypeServiceDetailComponent,
    SygTypeServiceUpdateComponent,
    SygTypeServiceDeleteDialogComponent,
  ],
  entryComponents: [SygTypeServiceDeleteDialogComponent],
})
export class PlanpassationmsSygTypeServiceModule {}
