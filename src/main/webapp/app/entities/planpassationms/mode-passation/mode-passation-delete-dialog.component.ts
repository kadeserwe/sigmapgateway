import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IModePassation } from 'app/shared/model/planpassationms/mode-passation.model';
import { ModePassationService } from './mode-passation.service';

@Component({
  templateUrl: './mode-passation-delete-dialog.component.html',
})
export class ModePassationDeleteDialogComponent {
  modePassation?: IModePassation;

  constructor(
    protected modePassationService: ModePassationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.modePassationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('modePassationListModification');
      this.activeModal.close();
    });
  }
}
