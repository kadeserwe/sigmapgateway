import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBailleurs } from 'app/shared/model/bailleurs/bailleurs.model';

@Component({
  selector: 'jhi-bailleurs-detail',
  templateUrl: './bailleurs-detail.component.html',
})
export class BailleursDetailComponent implements OnInit {
  bailleurs: IBailleurs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bailleurs }) => (this.bailleurs = bailleurs));
  }

  previousState(): void {
    window.history.back();
  }
}
