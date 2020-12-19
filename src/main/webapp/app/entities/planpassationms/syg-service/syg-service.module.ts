import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaysigmapSharedModule } from 'app/shared/shared.module';
import { SygServiceComponent } from './syg-service.component';
import { SygServiceDetailComponent } from './syg-service-detail.component';
import { SygServiceUpdateComponent } from './syg-service-update.component';
import { SygServiceDeleteDialogComponent } from './syg-service-delete-dialog.component';
import { sygServiceRoute } from './syg-service.route';

@NgModule({
  imports: [GatewaysigmapSharedModule, RouterModule.forChild(sygServiceRoute)],
  declarations: [SygServiceComponent, SygServiceDetailComponent, SygServiceUpdateComponent, SygServiceDeleteDialogComponent],
  entryComponents: [SygServiceDeleteDialogComponent],
})
export class PlanpassationmsSygServiceModule {}
