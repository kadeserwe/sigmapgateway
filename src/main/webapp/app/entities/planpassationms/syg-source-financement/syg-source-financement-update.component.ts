import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISygSourceFinancement, SygSourceFinancement } from 'app/shared/model/planpassationms/syg-source-financement.model';
import { SygSourceFinancementService } from './syg-source-financement.service';
import { ISygTypeSourceFinancement } from 'app/shared/model/planpassationms/syg-type-source-financement.model';
import { SygTypeSourceFinancementService } from 'app/entities/planpassationms/syg-type-source-financement/syg-type-source-financement.service';

@Component({
  selector: 'jhi-syg-source-financement-update',
  templateUrl: './syg-source-financement-update.component.html',
})
export class SygSourceFinancementUpdateComponent implements OnInit {
  isSaving = false;
  sygtypesourcefinancements: ISygTypeSourceFinancement[] = [];

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    sygTypeSourceFinancementId: [null, Validators.required],
  });

  constructor(
    protected sygSourceFinancementService: SygSourceFinancementService,
    protected sygTypeSourceFinancementService: SygTypeSourceFinancementService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sygSourceFinancement }) => {
      this.updateForm(sygSourceFinancement);

      this.sygTypeSourceFinancementService
        .query()
        .subscribe((res: HttpResponse<ISygTypeSourceFinancement[]>) => (this.sygtypesourcefinancements = res.body || []));
    });
  }

  updateForm(sygSourceFinancement: ISygSourceFinancement): void {
    this.editForm.patchValue({
      id: sygSourceFinancement.id,
      libelle: sygSourceFinancement.libelle,
      sygTypeSourceFinancementId: sygSourceFinancement.sygTypeSourceFinancementId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sygSourceFinancement = this.createFromForm();
    if (sygSourceFinancement.id !== undefined) {
      this.subscribeToSaveResponse(this.sygSourceFinancementService.update(sygSourceFinancement));
    } else {
      this.subscribeToSaveResponse(this.sygSourceFinancementService.create(sygSourceFinancement));
    }
  }

  private createFromForm(): ISygSourceFinancement {
    return {
      ...new SygSourceFinancement(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      sygTypeSourceFinancementId: this.editForm.get(['sygTypeSourceFinancementId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISygSourceFinancement>>): void {
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

  trackById(index: number, item: ISygTypeSourceFinancement): any {
    return item.id;
  }
}
