import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlanPassation } from 'app/shared/model/planpassationms/plan-passation.model';
import { PlanPassationService } from './plan-passation.service';

@Component({
  templateUrl: './plan-passation-delete-dialog.component.html',
})
export class PlanPassationDeleteDialogComponent {
  planPassation?: IPlanPassation;

  constructor(
    protected planPassationService: PlanPassationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.planPassationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('planPassationListModification');
      this.activeModal.close();
    });
  }
}
