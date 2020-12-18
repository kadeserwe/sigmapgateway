import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { PlanPassationDetailComponent } from 'app/entities/planpassationms/plan-passation/plan-passation-detail.component';
import { PlanPassation } from 'app/shared/model/planpassationms/plan-passation.model';

describe('Component Tests', () => {
  describe('PlanPassation Management Detail Component', () => {
    let comp: PlanPassationDetailComponent;
    let fixture: ComponentFixture<PlanPassationDetailComponent>;
    let dataUtils: JhiDataUtils;
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
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load planPassation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.planPassation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
