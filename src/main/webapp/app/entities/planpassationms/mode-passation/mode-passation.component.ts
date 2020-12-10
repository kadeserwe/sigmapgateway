import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IModePassation } from 'app/shared/model/planpassationms/mode-passation.model';
import { ModePassationService } from './mode-passation.service';
import { ModePassationDeleteDialogComponent } from './mode-passation-delete-dialog.component';

@Component({
  selector: 'jhi-mode-passation',
  templateUrl: './mode-passation.component.html',
})
export class ModePassationComponent implements OnInit, OnDestroy {
  modePassations?: IModePassation[];
  eventSubscriber?: Subscription;

  constructor(
    protected modePassationService: ModePassationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.modePassationService.query().subscribe((res: HttpResponse<IModePassation[]>) => (this.modePassations = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInModePassations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IModePassation): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInModePassations(): void {
    this.eventSubscriber = this.eventManager.subscribe('modePassationListModification', () => this.loadAll());
  }

  delete(modePassation: IModePassation): void {
    const modalRef = this.modalService.open(ModePassationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.modePassation = modePassation;
  }
}
