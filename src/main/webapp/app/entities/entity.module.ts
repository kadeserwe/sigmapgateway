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
      {
        path: 'type-de-marche',
        loadChildren: () => import('./planpassationms/type-de-marche/type-de-marche.module').then(m => m.PlanpassationmsTypeDeMarcheModule),
      },
      {
        path: 'type-source-de-financement',
        loadChildren: () =>
          import('./planpassationms/type-source-de-financement/type-source-de-financement.module').then(
            m => m.PlanpassationmsTypeSourceDeFinancementModule
          ),
      },
      {
        path: 'source-de-financement',
        loadChildren: () =>
          import('./planpassationms/source-de-financement/source-de-financement.module').then(
            m => m.PlanpassationmsSourceDeFinancementModule
          ),
      },
      {
        path: 'type-service',
        loadChildren: () => import('./planpassationms/type-service/type-service.module').then(m => m.PlanpassationmsTypeServiceModule),
      },
      {
        path: 'syg-service',
        loadChildren: () => import('./planpassationms/syg-service/syg-service.module').then(m => m.PlanpassationmsSygServiceModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewaysigmapEntityModule {}
