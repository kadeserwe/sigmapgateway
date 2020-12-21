import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IHistorique, Historique } from 'app/shared/model/planpassationms/historique.model';
import { HistoriqueService } from './historique.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IPlanPassation } from 'app/shared/model/planpassationms/plan-passation.model';
import { PlanPassationService } from 'app/entities/planpassationms/plan-passation/plan-passation.service';

@Component({
  selector: 'jhi-historique-update',
  templateUrl: './historique-update.component.html',
})
export class HistoriqueUpdateComponent implements OnInit {
  isSaving = false;
  planpassations: IPlanPassation[] = [];
  dateRejetDp: any;
  dateRjet2Dp: any;
  dateMiseValidationDp: any;

  editForm = this.fb.group({
    id: [],
    dateRejet: [],
    dateRjet2: [],
    dateMiseValidation: [],
    commentaireRejet: [],
    commentaireMiseValidation: [],
    fichierMiseValidation: [],
    fichierMiseValidationContentType: [],
    fichierRejet: [],
    fichierRejetContentType: [],
    etat: [],
    etat2: [],
    commentaireRejet2: [],
    fichierRejet2: [],
    fichierRejet2ContentType: [],
    planPassationId: [null, Validators.required],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected historiqueService: HistoriqueService,
    protected planPassationService: PlanPassationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historique }) => {
      this.updateForm(historique);

      this.planPassationService.query().subscribe((res: HttpResponse<IPlanPassation[]>) => (this.planpassations = res.body || []));
    });
  }

  updateForm(historique: IHistorique): void {
    this.editForm.patchValue({
      id: historique.id,
      dateRejet: historique.dateRejet,
      dateRjet2: historique.dateRjet2,
      dateMiseValidation: historique.dateMiseValidation,
      commentaireRejet: historique.commentaireRejet,
      commentaireMiseValidation: historique.commentaireMiseValidation,
      fichierMiseValidation: historique.fichierMiseValidation,
      fichierMiseValidationContentType: historique.fichierMiseValidationContentType,
      fichierRejet: historique.fichierRejet,
      fichierRejetContentType: historique.fichierRejetContentType,
      etat: historique.etat,
      etat2: historique.etat2,
      commentaireRejet2: historique.commentaireRejet2,
      fichierRejet2: historique.fichierRejet2,
      fichierRejet2ContentType: historique.fichierRejet2ContentType,
      planPassationId: historique.planPassationId,
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
    const historique = this.createFromForm();
    if (historique.id !== undefined) {
      this.subscribeToSaveResponse(this.historiqueService.update(historique));
    } else {
      this.subscribeToSaveResponse(this.historiqueService.create(historique));
    }
  }

  private createFromForm(): IHistorique {
    return {
      ...new Historique(),
      id: this.editForm.get(['id'])!.value,
      dateRejet: this.editForm.get(['dateRejet'])!.value,
      dateRjet2: this.editForm.get(['dateRjet2'])!.value,
      dateMiseValidation: this.editForm.get(['dateMiseValidation'])!.value,
      commentaireRejet: this.editForm.get(['commentaireRejet'])!.value,
      commentaireMiseValidation: this.editForm.get(['commentaireMiseValidation'])!.value,
      fichierMiseValidationContentType: this.editForm.get(['fichierMiseValidationContentType'])!.value,
      fichierMiseValidation: this.editForm.get(['fichierMiseValidation'])!.value,
      fichierRejetContentType: this.editForm.get(['fichierRejetContentType'])!.value,
      fichierRejet: this.editForm.get(['fichierRejet'])!.value,
      etat: this.editForm.get(['etat'])!.value,
      etat2: this.editForm.get(['etat2'])!.value,
      commentaireRejet2: this.editForm.get(['commentaireRejet2'])!.value,
      fichierRejet2ContentType: this.editForm.get(['fichierRejet2ContentType'])!.value,
      fichierRejet2: this.editForm.get(['fichierRejet2'])!.value,
      planPassationId: this.editForm.get(['planPassationId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistorique>>): void {
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
