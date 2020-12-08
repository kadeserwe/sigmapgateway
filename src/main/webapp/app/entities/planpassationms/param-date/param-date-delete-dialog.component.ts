import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParamDate } from 'app/shared/model/planpassationms/param-date.model';
import { ParamDateService } from './param-date.service';

@Component({
  templateUrl: './param-date-delete-dialog.component.html',
})
export class ParamDateDeleteDialogComponent {
  paramDate?: IParamDate;

  constructor(protected paramDateService: ParamDateService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paramDateService.delete(id).subscribe(() => {
      this.eventManager.broadcast('paramDateListModification');
      this.activeModal.close();
    });
  }
}
