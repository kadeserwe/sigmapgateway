import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBailleurs, Bailleurs } from 'app/shared/model/bailleurs/bailleurs.model';
import { BailleursService } from './bailleurs.service';

@Component({
  selector: 'jhi-bailleurs-update',
  templateUrl: './bailleurs-update.component.html',
})
export class BailleursUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
  });

  constructor(protected bailleursService: BailleursService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bailleurs }) => {
      this.updateForm(bailleurs);
    });
  }

  updateForm(bailleurs: IBailleurs): void {
    this.editForm.patchValue({
      id: bailleurs.id,
      libelle: bailleurs.libelle,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bailleurs = this.createFromForm();
    if (bailleurs.id !== undefined) {
      this.subscribeToSaveResponse(this.bailleursService.update(bailleurs));
    } else {
      this.subscribeToSaveResponse(this.bailleursService.create(bailleurs));
    }
  }

  private createFromForm(): IBailleurs {
    return {
      ...new Bailleurs(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBailleurs>>): void {
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
