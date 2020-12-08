import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { RealisationDetailComponent } from 'app/entities/planpassationms/realisation/realisation-detail.component';
import { Realisation } from 'app/shared/model/planpassationms/realisation.model';

describe('Component Tests', () => {
  describe('Realisation Management Detail Component', () => {
    let comp: RealisationDetailComponent;
    let fixture: ComponentFixture<RealisationDetailComponent>;
    const route = ({ data: of({ realisation: new Realisation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [RealisationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RealisationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RealisationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load realisation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.realisation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
