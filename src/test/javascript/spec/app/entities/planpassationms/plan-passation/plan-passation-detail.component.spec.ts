import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { PlanPassationDetailComponent } from 'app/entities/planpassationms/plan-passation/plan-passation-detail.component';
import { PlanPassation } from 'app/shared/model/planpassationms/plan-passation.model';

describe('Component Tests', () => {
  describe('PlanPassation Management Detail Component', () => {
    let comp: PlanPassationDetailComponent;
    let fixture: ComponentFixture<PlanPassationDetailComponent>;
    const route = ({ data: of({ planPassation: new PlanPassation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [PlanPassationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PlanPassationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlanPassationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load planPassation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.planPassation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
