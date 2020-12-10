import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'plan-passation',
        loadChildren: () =>
          import('./planpassationms/plan-passation/plan-passation.module').then(m => m.PlanpassationmsPlanPassationModule),
      },
      {
        path: 'param-date',
        loadChildren: () => import('./planpassationms/param-date/param-date.module').then(m => m.PlanpassationmsParamDateModule),
      },
      {
        path: 'realisation',
        loadChildren: () => import('./planpassationms/realisation/realisation.module').then(m => m.PlanpassationmsRealisationModule),
      },
      {
        path: 'bailleurs',
        loadChildren: () => import('./bailleurs/bailleurs/bailleurs.module').then(m => m.BailleursBailleursModule),
      },
      {
        path: 'mode-passation',
        loadChildren: () =>
          import('./planpassationms/mode-passation/mode-passation.module').then(m => m.PlanpassationmsModePassationModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewaysigmapEntityModule {}
