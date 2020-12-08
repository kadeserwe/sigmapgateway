import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaysigmapSharedModule } from 'app/shared/shared.module';
import { BailleursComponent } from './bailleurs.component';
import { BailleursDetailComponent } from './bailleurs-detail.component';
import { BailleursUpdateComponent } from './bailleurs-update.component';
import { BailleursDeleteDialogComponent } from './bailleurs-delete-dialog.component';
import { bailleursRoute } from './bailleurs.route';

@NgModule({
  imports: [GatewaysigmapSharedModule, RouterModule.forChild(bailleursRoute)],
  declarations: [BailleursComponent, BailleursDetailComponent, BailleursUpdateComponent, BailleursDeleteDialogComponent],
  entryComponents: [BailleursDeleteDialogComponent],
})
export class BailleursBailleursModule {}
