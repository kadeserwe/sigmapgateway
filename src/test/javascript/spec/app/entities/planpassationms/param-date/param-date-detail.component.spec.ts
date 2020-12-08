import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { ParamDateDetailComponent } from 'app/entities/planpassationms/param-date/param-date-detail.component';
import { ParamDate } from 'app/shared/model/planpassationms/param-date.model';

describe('Component Tests', () => {
  describe('ParamDate Management Detail Component', () => {
    let comp: ParamDateDetailComponent;
    let fixture: ComponentFixture<ParamDateDetailComponent>;
    const route = ({ data: of({ paramDate: new ParamDate(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [ParamDateDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ParamDateDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParamDateDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load paramDate on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paramDate).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
