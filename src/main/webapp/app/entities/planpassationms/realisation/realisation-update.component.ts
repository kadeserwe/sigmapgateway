import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRealisation, Realisation } from 'app/shared/model/planpassationms/realisation.model';
import { RealisationService } from './realisation.service';
import { IPlanPassation } from 'app/shared/model/planpassationms/plan-passation.model';
import { PlanPassationService } from 'app/entities/planpassationms/plan-passation/plan-passation.service';

@Component({
  selector: 'jhi-realisation-update',
  templateUrl: './realisation-update.component.html',
})
export class RealisationUpdateComponent implements OnInit {
  isSaving = false;
  planpassations: IPlanPassation[] = [];
  dateAttributionDp: any;

  editForm = this.fb.group({
    id: [],
    libelle: [],
    dateAttribution: [null, [Validators.required]],
    delaiexecution: [null, [Validators.required]],
    planPassationId: [null, Validators.required],
  });

  constructor(
    protected realisationService: RealisationService,
    protected planPassationService: PlanPassationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ realisation }) => {
      this.updateForm(realisation);

      this.planPassationService.query().subscribe((res: HttpResponse<IPlanPassation[]>) => (this.planpassations = res.body || []));
    });
  }

  updateForm(realisation: IRealisation): void {
    this.editForm.patchValue({
      id: realisation.id,
      libelle: realisation.libelle,
      dateAttribution: realisation.dateAttribution,
      delaiexecution: realisation.delaiexecution,
      planPassationId: realisation.planPassationId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const realisation = this.createFromForm();
    if (realisation.id !== undefined) {
      this.subscribeToSaveResponse(this.realisationService.update(realisation));
    } else {
      this.subscribeToSaveResponse(this.realisationService.create(realisation));
    }
  }

  private createFromForm(): IRealisation {
    return {
      ...new Realisation(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      dateAttribution: this.editForm.get(['dateAttribution'])!.value,
      delaiexecution: this.editForm.get(['delaiexecution'])!.value,
      planPassationId: this.editForm.get(['planPassationId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRealisation>>): void {
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

  trackById(index: number, item: IPlanPassation): any {
    return item.id;
  }
}
