import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { SygTypeSourceFinancementDetailComponent } from 'app/entities/planpassationms/syg-type-source-financement/syg-type-source-financement-detail.component';
import { SygTypeSourceFinancement } from 'app/shared/model/planpassationms/syg-type-source-financement.model';

describe('Component Tests', () => {
  describe('SygTypeSourceFinancement Management Detail Component', () => {
    let comp: SygTypeSourceFinancementDetailComponent;
    let fixture: ComponentFixture<SygTypeSourceFinancementDetailComponent>;
    const route = ({ data: of({ sygTypeSourceFinancement: new SygTypeSourceFinancement(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [SygTypeSourceFinancementDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SygTypeSourceFinancementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SygTypeSourceFinancementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sygTypeSourceFinancement on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sygTypeSourceFinancement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
