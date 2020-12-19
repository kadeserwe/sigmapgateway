import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { SygTypeServiceDetailComponent } from 'app/entities/planpassationms/syg-type-service/syg-type-service-detail.component';
import { SygTypeService } from 'app/shared/model/planpassationms/syg-type-service.model';

describe('Component Tests', () => {
  describe('SygTypeService Management Detail Component', () => {
    let comp: SygTypeServiceDetailComponent;
    let fixture: ComponentFixture<SygTypeServiceDetailComponent>;
    const route = ({ data: of({ sygTypeService: new SygTypeService(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [SygTypeServiceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SygTypeServiceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SygTypeServiceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sygTypeService on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sygTypeService).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
