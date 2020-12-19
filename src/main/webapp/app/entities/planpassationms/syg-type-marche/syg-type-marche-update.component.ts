import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISygTypeMarche, SygTypeMarche } from 'app/shared/model/planpassationms/syg-type-marche.model';
import { SygTypeMarcheService } from './syg-type-marche.service';

@Component({
  selector: 'jhi-syg-type-marche-update',
  templateUrl: './syg-type-marche-update.component.html',
})
export class SygTypeMarcheUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    libelle: [null, [Validators.required]],
    description: [],
  });

  constructor(protected sygTypeMarcheService: SygTypeMarcheService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sygTypeMarche }) => {
      this.updateForm(sygTypeMarche);
    });
  }

  updateForm(sygTypeMarche: ISygTypeMarche): void {
    this.editForm.patchValue({
      id: sygTypeMarche.id,
      code: sygTypeMarche.code,
      libelle: sygTypeMarche.libelle,
      description: sygTypeMarche.description,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sygTypeMarche = this.createFromForm();
    if (sygTypeMarche.id !== undefined) {
      this.subscribeToSaveResponse(this.sygTypeMarcheService.update(sygTypeMarche));
    } else {
      this.subscribeToSaveResponse(this.sygTypeMarcheService.create(sygTypeMarche));
    }
  }

  private createFromForm(): ISygTypeMarche {
    return {
      ...new SygTypeMarche(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISygTypeMarche>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
