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
        path: 'historique',
        loadChildren: () => import('./planpassationms/historique/historique.module').then(m => m.PlanpassationmsHistoriqueModule),
      },
      {
        path: 'syg-service',
        loadChildren: () => import('./planpassationms/syg-service/syg-service.module').then(m => m.PlanpassationmsSygServiceModule),
      },
      {
        path: 'syg-type-marche',
        loadChildren: () =>
          import('./planpassationms/syg-type-marche/syg-type-marche.module').then(m => m.PlanpassationmsSygTypeMarcheModule),
      },
      {
        path: 'syg-type-service',
        loadChildren: () =>
          import('./planpassationms/syg-type-service/syg-type-service.module').then(m => m.PlanpassationmsSygTypeServiceModule),
      },
      {
        path: 'syg-type-source-financement',
        loadChildren: () =>
          import('./planpassationms/syg-type-source-financement/syg-type-source-financement.module').then(
            m => m.PlanpassationmsSygTypeSourceFinancementModule
          ),
      },
      {
        path: 'syg-source-financement',
        loadChildren: () =>
          import('./planpassationms/syg-source-financement/syg-source-financement.module').then(
            m => m.PlanpassationmsSygSourceFinancementModule
          ),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewaysigmapEntityModule {}
