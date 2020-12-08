import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { RealisationUpdateComponent } from 'app/entities/planpassationms/realisation/realisation-update.component';
import { RealisationService } from 'app/entities/planpassationms/realisation/realisation.service';
import { Realisation } from 'app/shared/model/planpassationms/realisation.model';

describe('Component Tests', () => {
  describe('Realisation Management Update Component', () => {
    let comp: RealisationUpdateComponent;
    let fixture: ComponentFixture<RealisationUpdateComponent>;
    let service: RealisationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [RealisationUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RealisationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RealisationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RealisationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Realisation(123);
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
        const entity = new Realisation();
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
