import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaysigmapSharedModule } from 'app/shared/shared.module';
import { ParamDateComponent } from './param-date.component';
import { ParamDateDetailComponent } from './param-date-detail.component';
import { ParamDateUpdateComponent } from './param-date-update.component';
import { ParamDateDeleteDialogComponent } from './param-date-delete-dialog.component';
import { paramDateRoute } from './param-date.route';

@NgModule({
  imports: [GatewaysigmapSharedModule, RouterModule.forChild(paramDateRoute)],
  declarations: [ParamDateComponent, ParamDateDetailComponent, ParamDateUpdateComponent, ParamDateDeleteDialogComponent],
  entryComponents: [ParamDateDeleteDialogComponent],
})
export class PlanpassationmsParamDateModule {}
