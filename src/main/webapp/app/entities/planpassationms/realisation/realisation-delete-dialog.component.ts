import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRealisation } from 'app/shared/model/planpassationms/realisation.model';
import { RealisationService } from './realisation.service';

@Component({
  templateUrl: './realisation-delete-dialog.component.html',
})
export class RealisationDeleteDialogComponent {
  realisation?: IRealisation;

  constructor(
    protected realisationService: RealisationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.realisationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('realisationListModification');
      this.activeModal.close();
    });
  }
}
