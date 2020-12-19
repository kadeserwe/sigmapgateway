import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { SygServiceUpdateComponent } from 'app/entities/planpassationms/syg-service/syg-service-update.component';
import { SygServiceService } from 'app/entities/planpassationms/syg-service/syg-service.service';
import { SygService } from 'app/shared/model/planpassationms/syg-service.model';

describe('Component Tests', () => {
  describe('SygService Management Update Component', () => {
    let comp: SygServiceUpdateComponent;
    let fixture: ComponentFixture<SygServiceUpdateComponent>;
    let service: SygServiceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [SygServiceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SygServiceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SygServiceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SygServiceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SygService(123);
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
        const entity = new SygService();
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
