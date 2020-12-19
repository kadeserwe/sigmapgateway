import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { SygTypeMarcheUpdateComponent } from 'app/entities/planpassationms/syg-type-marche/syg-type-marche-update.component';
import { SygTypeMarcheService } from 'app/entities/planpassationms/syg-type-marche/syg-type-marche.service';
import { SygTypeMarche } from 'app/shared/model/planpassationms/syg-type-marche.model';

describe('Component Tests', () => {
  describe('SygTypeMarche Management Update Component', () => {
    let comp: SygTypeMarcheUpdateComponent;
    let fixture: ComponentFixture<SygTypeMarcheUpdateComponent>;
    let service: SygTypeMarcheService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [SygTypeMarcheUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SygTypeMarcheUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SygTypeMarcheUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SygTypeMarcheService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SygTypeMarche(123);
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
        const entity = new SygTypeMarche();
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
