import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaysigmapSharedModule } from 'app/shared/shared.module';
import { SygTypeMarcheComponent } from './syg-type-marche.component';
import { SygTypeMarcheDetailComponent } from './syg-type-marche-detail.component';
import { SygTypeMarcheUpdateComponent } from './syg-type-marche-update.component';
import { SygTypeMarcheDeleteDialogComponent } from './syg-type-marche-delete-dialog.component';
import { sygTypeMarcheRoute } from './syg-type-marche.route';

@NgModule({
  imports: [GatewaysigmapSharedModule, RouterModule.forChild(sygTypeMarcheRoute)],
  declarations: [SygTypeMarcheComponent, SygTypeMarcheDetailComponent, SygTypeMarcheUpdateComponent, SygTypeMarcheDeleteDialogComponent],
  entryComponents: [SygTypeMarcheDeleteDialogComponent],
})
export class PlanpassationmsSygTypeMarcheModule {}
