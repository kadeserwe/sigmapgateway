import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IParamDate, ParamDate } from 'app/shared/model/planpassationms/param-date.model';
import { ParamDateService } from './param-date.service';

@Component({
  selector: 'jhi-param-date-update',
  templateUrl: './param-date-update.component.html',
})
export class ParamDateUpdateComponent implements OnInit {
  isSaving = false;
  dateCreatDp: any;

  editForm = this.fb.group({
    id: [],
    dateCreat: [],
  });

  constructor(protected paramDateService: ParamDateService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paramDate }) => {
      this.updateForm(paramDate);
    });
  }

  updateForm(paramDate: IParamDate): void {
    this.editForm.patchValue({
      id: paramDate.id,
      dateCreat: paramDate.dateCreat,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paramDate = this.createFromForm();
    if (paramDate.id !== undefined) {
      this.subscribeToSaveResponse(this.paramDateService.update(paramDate));
    } else {
      this.subscribeToSaveResponse(this.paramDateService.create(paramDate));
    }
  }

  private createFromForm(): IParamDate {
    return {
      ...new ParamDate(),
      id: this.editForm.get(['id'])!.value,
      dateCreat: this.editForm.get(['dateCreat'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParamDate>>): void {
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
