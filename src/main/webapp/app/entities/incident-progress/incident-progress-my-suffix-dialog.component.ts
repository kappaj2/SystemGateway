import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IncidentProgressMySuffix } from './incident-progress-my-suffix.model';
import { IncidentProgressMySuffixPopupService } from './incident-progress-my-suffix-popup.service';
import { IncidentProgressMySuffixService } from './incident-progress-my-suffix.service';

@Component({
    selector: 'jhi-incident-progress-my-suffix-dialog',
    templateUrl: './incident-progress-my-suffix-dialog.component.html'
})
export class IncidentProgressMySuffixDialogComponent implements OnInit {

    incidentProgress: IncidentProgressMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private incidentProgressService: IncidentProgressMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.incidentProgress.id !== undefined) {
            this.subscribeToSaveResponse(
                this.incidentProgressService.update(this.incidentProgress));
        } else {
            this.subscribeToSaveResponse(
                this.incidentProgressService.create(this.incidentProgress));
        }
    }

    private subscribeToSaveResponse(result: Observable<IncidentProgressMySuffix>) {
        result.subscribe((res: IncidentProgressMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: IncidentProgressMySuffix) {
        this.eventManager.broadcast({ name: 'incidentProgressListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-incident-progress-my-suffix-popup',
    template: ''
})
export class IncidentProgressMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private incidentProgressPopupService: IncidentProgressMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.incidentProgressPopupService
                    .open(IncidentProgressMySuffixDialogComponent as Component, params['id']);
            } else {
                this.incidentProgressPopupService
                    .open(IncidentProgressMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
