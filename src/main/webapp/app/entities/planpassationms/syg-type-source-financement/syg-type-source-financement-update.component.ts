import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISygTypeSourceFinancement, SygTypeSourceFinancement } from 'app/shared/model/planpassationms/syg-type-source-financement.model';
import { SygTypeSourceFinancementService } from './syg-type-source-financement.service';

@Component({
  selector: 'jhi-syg-type-source-financement-update',
  templateUrl: './syg-type-source-financement-update.component.html',
})
export class SygTypeSourceFinancementUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
  });

  constructor(
    protected sygTypeSourceFinancementService: SygTypeSourceFinancementService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sygTypeSourceFinancement }) => {
      this.updateForm(sygTypeSourceFinancement);
    });
  }

  updateForm(sygTypeSourceFinancement: ISygTypeSourceFinancement): void {
    this.editForm.patchValue({
      id: sygTypeSourceFinancement.id,
      libelle: sygTypeSourceFinancement.libelle,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sygTypeSourceFinancement = this.createFromForm();
    if (sygTypeSourceFinancement.id !== undefined) {
      this.subscribeToSaveResponse(this.sygTypeSourceFinancementService.update(sygTypeSourceFinancement));
    } else {
      this.subscribeToSaveResponse(this.sygTypeSourceFinancementService.create(sygTypeSourceFinancement));
    }
  }

  private createFromForm(): ISygTypeSourceFinancement {
    return {
      ...new SygTypeSourceFinancement(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISygTypeSourceFinancement>>): void {
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
