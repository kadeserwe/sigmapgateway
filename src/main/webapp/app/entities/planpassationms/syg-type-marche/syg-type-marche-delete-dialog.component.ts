import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISygTypeMarche } from 'app/shared/model/planpassationms/syg-type-marche.model';
import { SygTypeMarcheService } from './syg-type-marche.service';

@Component({
  templateUrl: './syg-type-marche-delete-dialog.component.html',
})
export class SygTypeMarcheDeleteDialogComponent {
  sygTypeMarche?: ISygTypeMarche;

  constructor(
    protected sygTypeMarcheService: SygTypeMarcheService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sygTypeMarcheService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sygTypeMarcheListModification');
      this.activeModal.close();
    });
  }
}
