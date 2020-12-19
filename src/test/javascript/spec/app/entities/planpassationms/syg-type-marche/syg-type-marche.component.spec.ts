import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { SygTypeMarcheComponent } from 'app/entities/planpassationms/syg-type-marche/syg-type-marche.component';
import { SygTypeMarcheService } from 'app/entities/planpassationms/syg-type-marche/syg-type-marche.service';
import { SygTypeMarche } from 'app/shared/model/planpassationms/syg-type-marche.model';

describe('Component Tests', () => {
  describe('SygTypeMarche Management Component', () => {
    let comp: SygTypeMarcheComponent;
    let fixture: ComponentFixture<SygTypeMarcheComponent>;
    let service: SygTypeMarcheService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [SygTypeMarcheComponent],
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
        .overrideTemplate(SygTypeMarcheComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SygTypeMarcheComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SygTypeMarcheService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SygTypeMarche(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sygTypeMarches && comp.sygTypeMarches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SygTypeMarche(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sygTypeMarches && comp.sygTypeMarches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
