import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISygTypeMarche } from 'app/shared/model/planpassationms/syg-type-marche.model';

@Component({
  selector: 'jhi-syg-type-marche-detail',
  templateUrl: './syg-type-marche-detail.component.html',
})
export class SygTypeMarcheDetailComponent implements OnInit {
  sygTypeMarche: ISygTypeMarche | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sygTypeMarche }) => (this.sygTypeMarche = sygTypeMarche));
  }

  previousState(): void {
    window.history.back();
  }
}
