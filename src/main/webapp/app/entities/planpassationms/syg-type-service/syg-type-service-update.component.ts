import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISygTypeService, SygTypeService } from 'app/shared/model/planpassationms/syg-type-service.model';
import { SygTypeServiceService } from './syg-type-service.service';

@Component({
  selector: 'jhi-syg-type-service-update',
  templateUrl: './syg-type-service-update.component.html',
})
export class SygTypeServiceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
  });

  constructor(protected sygTypeServiceService: SygTypeServiceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sygTypeService }) => {
      this.updateForm(sygTypeService);
    });
  }

  updateForm(sygTypeService: ISygTypeService): void {
    this.editForm.patchValue({
      id: sygTypeService.id,
      libelle: sygTypeService.libelle,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sygTypeService = this.createFromForm();
    if (sygTypeService.id !== undefined) {
      this.subscribeToSaveResponse(this.sygTypeServiceService.update(sygTypeService));
    } else {
      this.subscribeToSaveResponse(this.sygTypeServiceService.create(sygTypeService));
    }
  }

  private createFromForm(): ISygTypeService {
    return {
      ...new SygTypeService(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISygTypeService>>): void {
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
