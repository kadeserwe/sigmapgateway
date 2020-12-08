import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParamDate } from 'app/shared/model/planpassationms/param-date.model';

@Component({
  selector: 'jhi-param-date-detail',
  templateUrl: './param-date-detail.component.html',
})
export class ParamDateDetailComponent implements OnInit {
  paramDate: IParamDate | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paramDate }) => (this.paramDate = paramDate));
  }

  previousState(): void {
    window.history.back();
  }
}
