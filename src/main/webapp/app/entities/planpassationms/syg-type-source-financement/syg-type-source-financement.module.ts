import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaysigmapSharedModule } from 'app/shared/shared.module';
import { SygTypeSourceFinancementComponent } from './syg-type-source-financement.component';
import { SygTypeSourceFinancementDetailComponent } from './syg-type-source-financement-detail.component';
import { SygTypeSourceFinancementUpdateComponent } from './syg-type-source-financement-update.component';
import { SygTypeSourceFinancementDeleteDialogComponent } from './syg-type-source-financement-delete-dialog.component';
import { sygTypeSourceFinancementRoute } from './syg-type-source-financement.route';

@NgModule({
  imports: [GatewaysigmapSharedModule, RouterModule.forChild(sygTypeSourceFinancementRoute)],
  declarations: [
    SygTypeSourceFinancementComponent,
    SygTypeSourceFinancementDetailComponent,
    SygTypeSourceFinancementUpdateComponent,
    SygTypeSourceFinancementDeleteDialogComponent,
  ],
  entryComponents: [SygTypeSourceFinancementDeleteDialogComponent],
})
export class PlanpassationmsSygTypeSourceFinancementModule {}
