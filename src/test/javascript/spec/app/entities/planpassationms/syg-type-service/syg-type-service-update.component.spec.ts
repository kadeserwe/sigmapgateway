import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { SygTypeServiceUpdateComponent } from 'app/entities/planpassationms/syg-type-service/syg-type-service-update.component';
import { SygTypeServiceService } from 'app/entities/planpassationms/syg-type-service/syg-type-service.service';
import { SygTypeService } from 'app/shared/model/planpassationms/syg-type-service.model';

describe('Component Tests', () => {
  describe('SygTypeService Management Update Component', () => {
    let comp: SygTypeServiceUpdateComponent;
    let fixture: ComponentFixture<SygTypeServiceUpdateComponent>;
    let service: SygTypeServiceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [SygTypeServiceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SygTypeServiceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SygTypeServiceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SygTypeServiceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SygTypeService(123);
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
        const entity = new SygTypeService();
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
