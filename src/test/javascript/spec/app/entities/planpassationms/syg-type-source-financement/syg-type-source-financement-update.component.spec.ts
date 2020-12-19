import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { SygTypeSourceFinancementUpdateComponent } from 'app/entities/planpassationms/syg-type-source-financement/syg-type-source-financement-update.component';
import { SygTypeSourceFinancementService } from 'app/entities/planpassationms/syg-type-source-financement/syg-type-source-financement.service';
import { SygTypeSourceFinancement } from 'app/shared/model/planpassationms/syg-type-source-financement.model';

describe('Component Tests', () => {
  describe('SygTypeSourceFinancement Management Update Component', () => {
    let comp: SygTypeSourceFinancementUpdateComponent;
    let fixture: ComponentFixture<SygTypeSourceFinancementUpdateComponent>;
    let service: SygTypeSourceFinancementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [SygTypeSourceFinancementUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SygTypeSourceFinancementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SygTypeSourceFinancementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SygTypeSourceFinancementService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SygTypeSourceFinancement(123);
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
        const entity = new SygTypeSourceFinancement();
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
