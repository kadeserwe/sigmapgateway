import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlanPassation } from 'app/shared/model/planpassationms/plan-passation.model';

@Component({
  selector: 'jhi-plan-passation-detail',
  templateUrl: './plan-passation-detail.component.html',
})
export class PlanPassationDetailComponent implements OnInit {
  planPassation: IPlanPassation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planPassation }) => (this.planPassation = planPassation));
  }

  previousState(): void {
    window.history.back();
  }
}
