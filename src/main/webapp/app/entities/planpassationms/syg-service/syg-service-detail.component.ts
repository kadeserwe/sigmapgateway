import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISygService } from 'app/shared/model/planpassationms/syg-service.model';

@Component({
  selector: 'jhi-syg-service-detail',
  templateUrl: './syg-service-detail.component.html',
})
export class SygServiceDetailComponent implements OnInit {
  sygService: ISygService | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sygService }) => (this.sygService = sygService));
  }

  previousState(): void {
    window.history.back();
  }
}
