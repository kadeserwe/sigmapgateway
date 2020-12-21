import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewaysigmapTestModule } from '../../../../test.module';
import { HistoriqueUpdateComponent } from 'app/entities/planpassationms/historique/historique-update.component';
import { HistoriqueService } from 'app/entities/planpassationms/historique/historique.service';
import { Historique } from 'app/shared/model/planpassationms/historique.model';

describe('Component Tests', () => {
  describe('Historique Management Update Component', () => {
    let comp: HistoriqueUpdateComponent;
    let fixture: ComponentFixture<HistoriqueUpdateComponent>;
    let service: HistoriqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaysigmapTestModule],
        declarations: [HistoriqueUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(HistoriqueUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistoriqueUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistoriqueService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Historique(123);
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
        const entity = new Historique();
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
