import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { SygTypeSourceFinancementComponent } from 'app/entities/planpassationms/syg-type-source-financement/syg-type-source-financement.component';
import { SygTypeSourceFinancementService } from 'app/entities/planpassationms/syg-type-source-financement/syg-type-source-financement.service';
import { SygTypeSourceFinancement } from 'app/shared/model/planpassationms/syg-type-source-financement.model';

describe('Component Tests', () => {
  describe('SygTypeSourceFinancement Management Component', () => {
    let comp: SygTypeSourceFinancementComponent;
    let fixture: ComponentFixture<SygTypeSourceFinancementComponent>;
    let service: SygTypeSourceFinancementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [SygTypeSourceFinancementComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(SygTypeSourceFinancementComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SygTypeSourceFinancementComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SygTypeSourceFinancementService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SygTypeSourceFinancement(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sygTypeSourceFinancements && comp.sygTypeSourceFinancements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SygTypeSourceFinancement(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sygTypeSourceFinancements && comp.sygTypeSourceFinancements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
