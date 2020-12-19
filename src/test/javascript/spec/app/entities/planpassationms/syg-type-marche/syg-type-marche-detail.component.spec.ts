import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { SygTypeMarcheDetailComponent } from 'app/entities/planpassationms/syg-type-marche/syg-type-marche-detail.component';
import { SygTypeMarche } from 'app/shared/model/planpassationms/syg-type-marche.model';

describe('Component Tests', () => {
  describe('SygTypeMarche Management Detail Component', () => {
    let comp: SygTypeMarcheDetailComponent;
    let fixture: ComponentFixture<SygTypeMarcheDetailComponent>;
    const route = ({ data: of({ sygTypeMarche: new SygTypeMarche(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [SygTypeMarcheDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SygTypeMarcheDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SygTypeMarcheDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sygTypeMarche on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sygTypeMarche).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
