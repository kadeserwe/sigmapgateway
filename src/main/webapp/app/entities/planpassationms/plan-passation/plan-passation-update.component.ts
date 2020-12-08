import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPlanPassation, PlanPassation } from 'app/shared/model/planpassationms/plan-passation.model';
import { PlanPassationService } from './plan-passation.service';

@Component({
  selector: 'jhi-plan-passation-update',
  templateUrl: './plan-passation-update.component.html',
})
export class PlanPassationUpdateComponent implements OnInit {
  isSaving = false;
  dateDebutDp: any;
  dateFinDp: any;

  editForm = this.fb.group({
    id: [],
    dateDebut: [],
    dateFin: [],
    commentaire: [],
  });

  constructor(protected planPassationService: PlanPassationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planPassation }) => {
      this.updateForm(planPassation);
    });
  }

  updateForm(planPassation: IPlanPassation): void {
    this.editForm.patchValue({
      id: planPassation.id,
      dateDebut: planPassation.dateDebut,
      dateFin: planPassation.dateFin,
      commentaire: planPassation.commentaire,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const planPassation = this.createFromForm();
    if (planPassation.id !== undefined) {
      this.subscribeToSaveResponse(this.planPassationService.update(planPassation));
    } else {
      this.subscribeToSaveResponse(this.planPassationService.create(planPassation));
    }
  }

  private createFromForm(): IPlanPassation {
    return {
      ...new PlanPassation(),
      id: this.editForm.get(['id'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value,
      dateFin: this.editForm.get(['dateFin'])!.value,
      commentaire: this.editForm.get(['commentaire'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanPassation>>): void {
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
