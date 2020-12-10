import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { ModePassationDetailComponent } from 'app/entities/planpassationms/mode-passation/mode-passation-detail.component';
import { ModePassation } from 'app/shared/model/planpassationms/mode-passation.model';

describe('Component Tests', () => {
  describe('ModePassation Management Detail Component', () => {
    let comp: ModePassationDetailComponent;
    let fixture: ComponentFixture<ModePassationDetailComponent>;
    const route = ({ data: of({ modePassation: new ModePassation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [ModePassationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ModePassationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ModePassationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load modePassation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.modePassation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
