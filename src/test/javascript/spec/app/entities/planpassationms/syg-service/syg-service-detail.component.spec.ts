import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { SygServiceDetailComponent } from 'app/entities/planpassationms/syg-service/syg-service-detail.component';
import { SygService } from 'app/shared/model/planpassationms/syg-service.model';

describe('Component Tests', () => {
  describe('SygService Management Detail Component', () => {
    let comp: SygServiceDetailComponent;
    let fixture: ComponentFixture<SygServiceDetailComponent>;
    const route = ({ data: of({ sygService: new SygService(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [SygServiceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SygServiceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SygServiceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sygService on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sygService).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
