import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaysigmapSharedModule } from 'app/shared/shared.module';
import { HistoriqueComponent } from './historique.component';
import { HistoriqueDetailComponent } from './historique-detail.component';
import { HistoriqueUpdateComponent } from './historique-update.component';
import { HistoriqueDeleteDialogComponent } from './historique-delete-dialog.component';
import { historiqueRoute } from './historique.route';

@NgModule({
  imports: [GatewaysigmapSharedModule, RouterModule.forChild(historiqueRoute)],
  declarations: [HistoriqueComponent, HistoriqueDetailComponent, HistoriqueUpdateComponent, HistoriqueDeleteDialogComponent],
  entryComponents: [HistoriqueDeleteDialogComponent],
})
export class PlanpassationmsHistoriqueModule {}
