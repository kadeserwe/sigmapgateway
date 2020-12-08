import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { ParamDateUpdateComponent } from 'app/entities/planpassationms/param-date/param-date-update.component';
import { ParamDateService } from 'app/entities/planpassationms/param-date/param-date.service';
import { ParamDate } from 'app/shared/model/planpassationms/param-date.model';

describe('Component Tests', () => {
  describe('ParamDate Management Update Component', () => {
    let comp: ParamDateUpdateComponent;
    let fixture: ComponentFixture<ParamDateUpdateComponent>;
    let service: ParamDateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [ParamDateUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ParamDateUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParamDateUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParamDateService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ParamDate(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ParamDate();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
