import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { BailleursDetailComponent } from 'app/entities/bailleurs/bailleurs/bailleurs-detail.component';
import { Bailleurs } from 'app/shared/model/bailleurs/bailleurs.model';

describe('Component Tests', () => {
  describe('Bailleurs Management Detail Component', () => {
    let comp: BailleursDetailComponent;
    let fixture: ComponentFixture<BailleursDetailComponent>;
    const route = ({ data: of({ bailleurs: new Bailleurs(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [BailleursDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BailleursDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BailleursDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load bailleurs on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bailleurs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
