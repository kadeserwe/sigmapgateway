import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPlanPassation } from 'app/shared/model/planpassationms/plan-passation.model';

@Component({
  selector: 'jhi-plan-passation-detail',
  templateUrl: './plan-passation-detail.component.html',
})
export class PlanPassationDetailComponent implements OnInit {
  planPassation: IPlanPassation | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planPassation }) => (this.planPassation = planPassation));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
