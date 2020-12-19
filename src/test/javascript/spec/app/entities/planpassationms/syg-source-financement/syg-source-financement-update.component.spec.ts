import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { SygSourceFinancementUpdateComponent } from 'app/entities/planpassationms/syg-source-financement/syg-source-financement-update.component';
import { SygSourceFinancementService } from 'app/entities/planpassationms/syg-source-financement/syg-source-financement.service';
import { SygSourceFinancement } from 'app/shared/model/planpassationms/syg-source-financement.model';

describe('Component Tests', () => {
  describe('SygSourceFinancement Management Update Component', () => {
    let comp: SygSourceFinancementUpdateComponent;
    let fixture: ComponentFixture<SygSourceFinancementUpdateComponent>;
    let service: SygSourceFinancementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [SygSourceFinancementUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SygSourceFinancementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SygSourceFinancementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SygSourceFinancementService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SygSourceFinancement(123);
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
        const entity = new SygSourceFinancement();
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
