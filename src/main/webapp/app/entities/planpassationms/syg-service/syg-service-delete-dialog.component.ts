import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISygService } from 'app/shared/model/planpassationms/syg-service.model';
import { SygServiceService } from './syg-service.service';

@Component({
  templateUrl: './syg-service-delete-dialog.component.html',
})
export class SygServiceDeleteDialogComponent {
  sygService?: ISygService;

  constructor(
    protected sygServiceService: SygServiceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sygServiceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sygServiceListModification');
      this.activeModal.close();
    });
  }
}
