import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISygSourceFinancement } from 'app/shared/model/planpassationms/syg-source-financement.model';
import { SygSourceFinancementService } from './syg-source-financement.service';

@Component({
  templateUrl: './syg-source-financement-delete-dialog.component.html',
})
export class SygSourceFinancementDeleteDialogComponent {
  sygSourceFinancement?: ISygSourceFinancement;

  constructor(
    protected sygSourceFinancementService: SygSourceFinancementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sygSourceFinancementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sygSourceFinancementListModification');
      this.activeModal.close();
    });
  }
}
