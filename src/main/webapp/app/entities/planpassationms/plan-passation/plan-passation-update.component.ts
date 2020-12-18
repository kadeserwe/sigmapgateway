import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IPlanPassation, PlanPassation } from 'app/shared/model/planpassationms/plan-passation.model';
import { PlanPassationService } from './plan-passation.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-plan-passation-update',
  templateUrl: './plan-passation-update.component.html',
})
export class PlanPassationUpdateComponent implements OnInit {
  isSaving = false;
  dateDebutDp: any;
  dateFinDp: any;
  dateCreationDp: any;
  dateMiseValidationDp: any;
  dateValidationDp: any;
  dateMiseEnValidationCcmpDp: any;
  dateValidation1Dp: any;
  dateValidation2Dp: any;
  dateRejetDp: any;
  datePublicationDp: any;

  editForm = this.fb.group({
    id: [],
    dateDebut: [],
    dateFin: [],
    commentaire: [],
    annee: [null, [Validators.required]],
    dateCreation: [null, [Validators.required]],
    dateMiseValidation: [],
    dateValidation: [],
    statut: [],
    commentaireMiseEnValidationAC: [],
    referenceMiseValidationAC: [],
    fichierMiseValidationAC: [],
    fichierMiseValidationACContentType: [],
    dateMiseEnValidationCcmp: [],
    fichierMiseValidationCcmp: [],
    fichierMiseValidationCcmpContentType: [],
    referenceMiseValidationCcmp: [],
    dateValidation1: [],
    commentaireValidation: [],
    referenceValidation: [],
    fichierValidation: [],
    fichierValidationContentType: [],
    dateValidation2: [],
    dateRejet: [],
    datePublication: [],
    commentairePublication: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected planPassationService: PlanPassationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

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
      annee: planPassation.annee,
      dateCreation: planPassation.dateCreation,
      dateMiseValidation: planPassation.dateMiseValidation,
      dateValidation: planPassation.dateValidation,
      statut: planPassation.statut,
      commentaireMiseEnValidationAC: planPassation.commentaireMiseEnValidationAC,
      referenceMiseValidationAC: planPassation.referenceMiseValidationAC,
      fichierMiseValidationAC: planPassation.fichierMiseValidationAC,
      fichierMiseValidationACContentType: planPassation.fichierMiseValidationACContentType,
      dateMiseEnValidationCcmp: planPassation.dateMiseEnValidationCcmp,
      fichierMiseValidationCcmp: planPassation.fichierMiseValidationCcmp,
      fichierMiseValidationCcmpContentType: planPassation.fichierMiseValidationCcmpContentType,
      referenceMiseValidationCcmp: planPassation.referenceMiseValidationCcmp,
      dateValidation1: planPassation.dateValidation1,
      commentaireValidation: planPassation.commentaireValidation,
      referenceValidation: planPassation.referenceValidation,
      fichierValidation: planPassation.fichierValidation,
      fichierValidationContentType: planPassation.fichierValidationContentType,
      dateValidation2: planPassation.dateValidation2,
      dateRejet: planPassation.dateRejet,
      datePublication: planPassation.datePublication,
      commentairePublication: planPassation.commentairePublication,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('gatewaysigmapApp.error', { ...err, key: 'error.file.' + err.key })
      );
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
      annee: this.editForm.get(['annee'])!.value,
      dateCreation: this.editForm.get(['dateCreation'])!.value,
      dateMiseValidation: this.editForm.get(['dateMiseValidation'])!.value,
      dateValidation: this.editForm.get(['dateValidation'])!.value,
      statut: this.editForm.get(['statut'])!.value,
      commentaireMiseEnValidationAC: this.editForm.get(['commentaireMiseEnValidationAC'])!.value,
      referenceMiseValidationAC: this.editForm.get(['referenceMiseValidationAC'])!.value,
      fichierMiseValidationACContentType: this.editForm.get(['fichierMiseValidationACContentType'])!.value,
      fichierMiseValidationAC: this.editForm.get(['fichierMiseValidationAC'])!.value,
      dateMiseEnValidationCcmp: this.editForm.get(['dateMiseEnValidationCcmp'])!.value,
      fichierMiseValidationCcmpContentType: this.editForm.get(['fichierMiseValidationCcmpContentType'])!.value,
      fichierMiseValidationCcmp: this.editForm.get(['fichierMiseValidationCcmp'])!.value,
      referenceMiseValidationCcmp: this.editForm.get(['referenceMiseValidationCcmp'])!.value,
      dateValidation1: this.editForm.get(['dateValidation1'])!.value,
      commentaireValidation: this.editForm.get(['commentaireValidation'])!.value,
      referenceValidation: this.editForm.get(['referenceValidation'])!.value,
      fichierValidationContentType: this.editForm.get(['fichierValidationContentType'])!.value,
      fichierValidation: this.editForm.get(['fichierValidation'])!.value,
      dateValidation2: this.editForm.get(['dateValidation2'])!.value,
      dateRejet: this.editForm.get(['dateRejet'])!.value,
      datePublication: this.editForm.get(['datePublication'])!.value,
      commentairePublication: this.editForm.get(['commentairePublication'])!.value,
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
