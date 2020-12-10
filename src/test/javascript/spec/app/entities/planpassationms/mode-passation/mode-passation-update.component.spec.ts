import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { ModePassationUpdateComponent } from 'app/entities/planpassationms/mode-passation/mode-passation-update.component';
import { ModePassationService } from 'app/entities/planpassationms/mode-passation/mode-passation.service';
import { ModePassation } from 'app/shared/model/planpassationms/mode-passation.model';

describe('Component Tests', () => {
  describe('ModePassation Management Update Component', () => {
    let comp: ModePassationUpdateComponent;
    let fixture: ComponentFixture<ModePassationUpdateComponent>;
    let service: ModePassationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [ModePassationUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ModePassationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ModePassationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ModePassationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ModePassation(123);
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
        const entity = new ModePassation();
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
