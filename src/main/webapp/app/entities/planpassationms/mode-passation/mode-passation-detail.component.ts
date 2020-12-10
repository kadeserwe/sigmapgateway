import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IModePassation } from 'app/shared/model/planpassationms/mode-passation.model';

@Component({
  selector: 'jhi-mode-passation-detail',
  templateUrl: './mode-passation-detail.component.html',
})
export class ModePassationDetailComponent implements OnInit {
  modePassation: IModePassation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modePassation }) => (this.modePassation = modePassation));
  }

  previousState(): void {
    window.history.back();
  }
}
