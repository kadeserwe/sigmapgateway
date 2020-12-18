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
  dateReceptionDossierDp: any;
  dateNonObjectionDp: any;
  dateAutorisationDp: any;
  dateRecepNonObjectionDp: any;
  dateRecepDossCorrigeDp: any;
  datePubParPrmpDp: any;
  dateOuverturePlisDp: any;
  dateRecepNonObjectOcmpDp: any;
  dateRecepRapportEvaDp: any;
  dateRecepNonObjectPtfDp: any;
  dateExamenJuridiqueDp: any;
  dateNotifContratDp: any;
  dateApprobationContratDp: any;

  editForm = this.fb.group({
    id: [],
    libelle: [],
    dateAttribution: [null, [Validators.required]],
    delaiexecution: [null, [Validators.required]],
    objet: [],
    montant: [],
    examenDncmp: [null, [Validators.required]],
    examenPtf: [null, [Validators.required]],
    chapitreImputation: [null, [Validators.required]],
    autorisationEngagement: [null, [Validators.required]],
    dateReceptionDossier: [null, [Validators.required]],
    dateNonObjection: [null, [Validators.required]],
    dateAutorisation: [null, [Validators.required]],
    dateRecepNonObjection: [null, [Validators.required]],
    dateRecepDossCorrige: [null, [Validators.required]],
    datePubParPrmp: [null, [Validators.required]],
    dateOuverturePlis: [null, [Validators.required]],
    dateRecepNonObjectOcmp: [null, [Validators.required]],
    dateRecepRapportEva: [null, [Validators.required]],
    dateRecepNonObjectPtf: [null, [Validators.required]],
    dateExamenJuridique: [null, [Validators.required]],
    dateNotifContrat: [null, [Validators.required]],
    dateApprobationContrat: [null, [Validators.required]],
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
      objet: realisation.objet,
      montant: realisation.montant,
      examenDncmp: realisation.examenDncmp,
      examenPtf: realisation.examenPtf,
      chapitreImputation: realisation.chapitreImputation,
      autorisationEngagement: realisation.autorisationEngagement,
      dateReceptionDossier: realisation.dateReceptionDossier,
      dateNonObjection: realisation.dateNonObjection,
      dateAutorisation: realisation.dateAutorisation,
      dateRecepNonObjection: realisation.dateRecepNonObjection,
      dateRecepDossCorrige: realisation.dateRecepDossCorrige,
      datePubParPrmp: realisation.datePubParPrmp,
      dateOuverturePlis: realisation.dateOuverturePlis,
      dateRecepNonObjectOcmp: realisation.dateRecepNonObjectOcmp,
      dateRecepRapportEva: realisation.dateRecepRapportEva,
      dateRecepNonObjectPtf: realisation.dateRecepNonObjectPtf,
      dateExamenJuridique: realisation.dateExamenJuridique,
      dateNotifContrat: realisation.dateNotifContrat,
      dateApprobationContrat: realisation.dateApprobationContrat,
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
      objet: this.editForm.get(['objet'])!.value,
      montant: this.editForm.get(['montant'])!.value,
      examenDncmp: this.editForm.get(['examenDncmp'])!.value,
      examenPtf: this.editForm.get(['examenPtf'])!.value,
      chapitreImputation: this.editForm.get(['chapitreImputation'])!.value,
      autorisationEngagement: this.editForm.get(['autorisationEngagement'])!.value,
      dateReceptionDossier: this.editForm.get(['dateReceptionDossier'])!.value,
      dateNonObjection: this.editForm.get(['dateNonObjection'])!.value,
      dateAutorisation: this.editForm.get(['dateAutorisation'])!.value,
      dateRecepNonObjection: this.editForm.get(['dateRecepNonObjection'])!.value,
      dateRecepDossCorrige: this.editForm.get(['dateRecepDossCorrige'])!.value,
      datePubParPrmp: this.editForm.get(['datePubParPrmp'])!.value,
      dateOuverturePlis: this.editForm.get(['dateOuverturePlis'])!.value,
      dateRecepNonObjectOcmp: this.editForm.get(['dateRecepNonObjectOcmp'])!.value,
      dateRecepRapportEva: this.editForm.get(['dateRecepRapportEva'])!.value,
      dateRecepNonObjectPtf: this.editForm.get(['dateRecepNonObjectPtf'])!.value,
      dateExamenJuridique: this.editForm.get(['dateExamenJuridique'])!.value,
      dateNotifContrat: this.editForm.get(['dateNotifContrat'])!.value,
      dateApprobationContrat: this.editForm.get(['dateApprobationContrat'])!.value,
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
