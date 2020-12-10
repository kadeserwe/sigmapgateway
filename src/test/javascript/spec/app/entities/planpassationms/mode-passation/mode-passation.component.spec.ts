import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { ModePassationComponent } from 'app/entities/planpassationms/mode-passation/mode-passation.component';
import { ModePassationService } from 'app/entities/planpassationms/mode-passation/mode-passation.service';
import { ModePassation } from 'app/shared/model/planpassationms/mode-passation.model';

describe('Component Tests', () => {
  describe('ModePassation Management Component', () => {
    let comp: ModePassationComponent;
    let fixture: ComponentFixture<ModePassationComponent>;
    let service: ModePassationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [ModePassationComponent],
      })
        .overrideTemplate(ModePassationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ModePassationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ModePassationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ModePassation(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.modePassations && comp.modePassations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
