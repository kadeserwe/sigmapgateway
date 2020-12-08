import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaysigmapSharedModule } from 'app/shared/shared.module';
import { RealisationComponent } from './realisation.component';
import { RealisationDetailComponent } from './realisation-detail.component';
import { RealisationUpdateComponent } from './realisation-update.component';
import { RealisationDeleteDialogComponent } from './realisation-delete-dialog.component';
import { realisationRoute } from './realisation.route';

@NgModule({
  imports: [GatewaysigmapSharedModule, RouterModule.forChild(realisationRoute)],
  declarations: [RealisationComponent, RealisationDetailComponent, RealisationUpdateComponent, RealisationDeleteDialogComponent],
  entryComponents: [RealisationDeleteDialogComponent],
})
export class PlanpassationmsRealisationModule {}
