import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaysigmapSharedModule } from 'app/shared/shared.module';
import { ModePassationComponent } from './mode-passation.component';
import { ModePassationDetailComponent } from './mode-passation-detail.component';
import { ModePassationUpdateComponent } from './mode-passation-update.component';
import { ModePassationDeleteDialogComponent } from './mode-passation-delete-dialog.component';
import { modePassationRoute } from './mode-passation.route';

@NgModule({
  imports: [GatewaysigmapSharedModule, RouterModule.forChild(modePassationRoute)],
  declarations: [ModePassationComponent, ModePassationDetailComponent, ModePassationUpdateComponent, ModePassationDeleteDialogComponent],
  entryComponents: [ModePassationDeleteDialogComponent],
})
export class PlanpassationmsModePassationModule {}
