import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaysigmapSharedModule } from 'app/shared/shared.module';
import { SygSourceFinancementComponent } from './syg-source-financement.component';
import { SygSourceFinancementDetailComponent } from './syg-source-financement-detail.component';
import { SygSourceFinancementUpdateComponent } from './syg-source-financement-update.component';
import { SygSourceFinancementDeleteDialogComponent } from './syg-source-financement-delete-dialog.component';
import { sygSourceFinancementRoute } from './syg-source-financement.route';

@NgModule({
  imports: [GatewaysigmapSharedModule, RouterModule.forChild(sygSourceFinancementRoute)],
  declarations: [
    SygSourceFinancementComponent,
    SygSourceFinancementDetailComponent,
    SygSourceFinancementUpdateComponent,
    SygSourceFinancementDeleteDialogComponent,
  ],
  entryComponents: [SygSourceFinancementDeleteDialogComponent],
})
export class PlanpassationmsSygSourceFinancementModule {}
