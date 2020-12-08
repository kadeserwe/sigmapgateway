import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBailleurs } from 'app/shared/model/bailleurs/bailleurs.model';
import { BailleursService } from './bailleurs.service';

@Component({
  templateUrl: './bailleurs-delete-dialog.component.html',
})
export class BailleursDeleteDialogComponent {
  bailleurs?: IBailleurs;

  constructor(protected bailleursService: BailleursService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bailleursService.delete(id).subscribe(() => {
      this.eventManager.broadcast('bailleursListModification');
      this.activeModal.close();
    });
  }
}
