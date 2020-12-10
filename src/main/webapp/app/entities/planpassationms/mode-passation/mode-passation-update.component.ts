import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IModePassation, ModePassation } from 'app/shared/model/planpassationms/mode-passation.model';
import { ModePassationService } from './mode-passation.service';

@Component({
  selector: 'jhi-mode-passation-update',
  templateUrl: './mode-passation-update.component.html',
})
export class ModePassationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    code: [null, [Validators.required]],
    description: [null, [Validators.required]],
  });

  constructor(protected modePassationService: ModePassationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modePassation }) => {
      this.updateForm(modePassation);
    });
  }

  updateForm(modePassation: IModePassation): void {
    this.editForm.patchValue({
      id: modePassation.id,
      libelle: modePassation.libelle,
      code: modePassation.code,
      description: modePassation.description,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const modePassation = this.createFromForm();
    if (modePassation.id !== undefined) {
      this.subscribeToSaveResponse(this.modePassationService.update(modePassation));
    } else {
      this.subscribeToSaveResponse(this.modePassationService.create(modePassation));
    }
  }

  private createFromForm(): IModePassation {
    return {
      ...new ModePassation(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      code: this.editForm.get(['code'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModePassation>>): void {
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
