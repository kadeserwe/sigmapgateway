import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IHistorique } from 'app/shared/model/planpassationms/historique.model';

@Component({
  selector: 'jhi-historique-detail',
  templateUrl: './historique-detail.component.html',
})
export class HistoriqueDetailComponent implements OnInit {
  historique: IHistorique | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historique }) => (this.historique = historique));
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
