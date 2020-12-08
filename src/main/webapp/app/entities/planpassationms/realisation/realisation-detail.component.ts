import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRealisation } from 'app/shared/model/planpassationms/realisation.model';

@Component({
  selector: 'jhi-realisation-detail',
  templateUrl: './realisation-detail.component.html',
})
export class RealisationDetailComponent implements OnInit {
  realisation: IRealisation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ realisation }) => (this.realisation = realisation));
  }

  previousState(): void {
    window.history.back();
  }
}
