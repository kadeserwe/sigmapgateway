import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISygTypeService } from 'app/shared/model/planpassationms/syg-type-service.model';
import { SygTypeServiceService } from './syg-type-service.service';

@Component({
  templateUrl: './syg-type-service-delete-dialog.component.html',
})
export class SygTypeServiceDeleteDialogComponent {
  sygTypeService?: ISygTypeService;

  constructor(
    protected sygTypeServiceService: SygTypeServiceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sygTypeServiceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sygTypeServiceListModification');
      this.activeModal.close();
    });
  }
}
