import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISygSourceFinancement } from 'app/shared/model/planpassationms/syg-source-financement.model';

@Component({
  selector: 'jhi-syg-source-financement-detail',
  templateUrl: './syg-source-financement-detail.component.html',
})
export class SygSourceFinancementDetailComponent implements OnInit {
  sygSourceFinancement: ISygSourceFinancement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sygSourceFinancement }) => (this.sygSourceFinancement = sygSourceFinancement));
  }

  previousState(): void {
    window.history.back();
  }
}
