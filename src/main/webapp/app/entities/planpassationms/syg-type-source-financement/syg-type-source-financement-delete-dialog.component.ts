import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISygTypeSourceFinancement } from 'app/shared/model/planpassationms/syg-type-source-financement.model';
import { SygTypeSourceFinancementService } from './syg-type-source-financement.service';

@Component({
  templateUrl: './syg-type-source-financement-delete-dialog.component.html',
})
export class SygTypeSourceFinancementDeleteDialogComponent {
  sygTypeSourceFinancement?: ISygTypeSourceFinancement;

  constructor(
    protected sygTypeSourceFinancementService: SygTypeSourceFinancementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sygTypeSourceFinancementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sygTypeSourceFinancementListModification');
      this.activeModal.close();
    });
  }
}
