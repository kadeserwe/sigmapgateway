import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistorique } from 'app/shared/model/planpassationms/historique.model';
import { HistoriqueService } from './historique.service';

@Component({
  templateUrl: './historique-delete-dialog.component.html',
})
export class HistoriqueDeleteDialogComponent {
  historique?: IHistorique;

  constructor(
    protected historiqueService: HistoriqueService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.historiqueService.delete(id).subscribe(() => {
      this.eventManager.broadcast('historiqueListModification');
      this.activeModal.close();
    });
  }
}
