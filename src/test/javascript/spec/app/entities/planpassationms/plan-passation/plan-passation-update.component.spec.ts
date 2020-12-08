import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { PlanPassationUpdateComponent } from 'app/entities/planpassationms/plan-passation/plan-passation-update.component';
import { PlanPassationService } from 'app/entities/planpassationms/plan-passation/plan-passation.service';
import { PlanPassation } from 'app/shared/model/planpassationms/plan-passation.model';

describe('Component Tests', () => {
  describe('PlanPassation Management Update Component', () => {
    let comp: PlanPassationUpdateComponent;
    let fixture: ComponentFixture<PlanPassationUpdateComponent>;
    let service: PlanPassationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [PlanPassationUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PlanPassationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlanPassationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlanPassationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlanPassation(123);
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
        const entity = new PlanPassation();
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
