import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISygService, SygService } from 'app/shared/model/planpassationms/syg-service.model';
import { SygServiceService } from './syg-service.service';
import { ISygTypeService } from 'app/shared/model/planpassationms/syg-type-service.model';
import { SygTypeServiceService } from 'app/entities/planpassationms/syg-type-service/syg-type-service.service';

@Component({
  selector: 'jhi-syg-service-update',
  templateUrl: './syg-service-update.component.html',
})
export class SygServiceUpdateComponent implements OnInit {
  isSaving = false;
  sygtypeservices: ISygTypeService[] = [];

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    libelle: [null, [Validators.required]],
    description: [],
    sygTypeServiceId: [null, Validators.required],
  });

  constructor(
    protected sygServiceService: SygServiceService,
    protected sygTypeServiceService: SygTypeServiceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sygService }) => {
      this.updateForm(sygService);

      this.sygTypeServiceService.query().subscribe((res: HttpResponse<ISygTypeService[]>) => (this.sygtypeservices = res.body || []));
    });
  }

  updateForm(sygService: ISygService): void {
    this.editForm.patchValue({
      id: sygService.id,
      code: sygService.code,
      libelle: sygService.libelle,
      description: sygService.description,
      sygTypeServiceId: sygService.sygTypeServiceId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sygService = this.createFromForm();
    if (sygService.id !== undefined) {
      this.subscribeToSaveResponse(this.sygServiceService.update(sygService));
    } else {
      this.subscribeToSaveResponse(this.sygServiceService.create(sygService));
    }
  }

  private createFromForm(): ISygService {
    return {
      ...new SygService(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      description: this.editForm.get(['description'])!.value,
      sygTypeServiceId: this.editForm.get(['sygTypeServiceId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISygService>>): void {
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

  trackById(index: number, item: ISygTypeService): any {
    return item.id;
  }
}
