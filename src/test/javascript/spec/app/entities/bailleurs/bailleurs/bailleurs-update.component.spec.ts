import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { BailleursUpdateComponent } from 'app/entities/bailleurs/bailleurs/bailleurs-update.component';
import { BailleursService } from 'app/entities/bailleurs/bailleurs/bailleurs.service';
import { Bailleurs } from 'app/shared/model/bailleurs/bailleurs.model';

describe('Component Tests', () => {
  describe('Bailleurs Management Update Component', () => {
    let comp: BailleursUpdateComponent;
    let fixture: ComponentFixture<BailleursUpdateComponent>;
    let service: BailleursService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [BailleursUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BailleursUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BailleursUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BailleursService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Bailleurs(123);
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
        const entity = new Bailleurs();
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
