import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { SygSourceFinancementDetailComponent } from 'app/entities/planpassationms/syg-source-financement/syg-source-financement-detail.component';
import { SygSourceFinancement } from 'app/shared/model/planpassationms/syg-source-financement.model';

describe('Component Tests', () => {
  describe('SygSourceFinancement Management Detail Component', () => {
    let comp: SygSourceFinancementDetailComponent;
    let fixture: ComponentFixture<SygSourceFinancementDetailComponent>;
    const route = ({ data: of({ sygSourceFinancement: new SygSourceFinancement(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [SygSourceFinancementDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SygSourceFinancementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SygSourceFinancementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sygSourceFinancement on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sygSourceFinancement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
