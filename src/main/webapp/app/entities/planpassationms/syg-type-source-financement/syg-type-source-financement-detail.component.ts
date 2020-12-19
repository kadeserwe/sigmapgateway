import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISygTypeSourceFinancement } from 'app/shared/model/planpassationms/syg-type-source-financement.model';

@Component({
  selector: 'jhi-syg-type-source-financement-detail',
  templateUrl: './syg-type-source-financement-detail.component.html',
})
export class SygTypeSourceFinancementDetailComponent implements OnInit {
  sygTypeSourceFinancement: ISygTypeSourceFinancement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sygTypeSourceFinancement }) => (this.sygTypeSourceFinancement = sygTypeSourceFinancement));
  }

  previousState(): void {
    window.history.back();
  }
}
