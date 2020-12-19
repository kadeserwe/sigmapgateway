import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISygTypeService } from 'app/shared/model/planpassationms/syg-type-service.model';

@Component({
  selector: 'jhi-syg-type-service-detail',
  templateUrl: './syg-type-service-detail.component.html',
})
export class SygTypeServiceDetailComponent implements OnInit {
  sygTypeService: ISygTypeService | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sygTypeService }) => (this.sygTypeService = sygTypeService));
  }

  previousState(): void {
    window.history.back();
  }
}
