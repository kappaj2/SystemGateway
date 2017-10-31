import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IncidentMySuffix } from './incident-my-suffix.model';
import { IncidentMySuffixPopupService } from './incident-my-suffix-popup.service';
import { IncidentMySuffixService } from './incident-my-suffix.service';

@Component({
    selector: 'jhi-incident-my-suffix-dialog',
    templateUrl: './incident-my-suffix-dialog.component.html'
})
export class IncidentMySuffixDialogComponent implements OnInit {

    incident: IncidentMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private incidentService: IncidentMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.incident.id !== undefined) {
            this.subscribeToSaveResponse(
                this.incidentService.update(this.incident));
        } else {
            this.subscribeToSaveResponse(
                this.incidentService.create(this.incident));
        }
    }

    private subscribeToSaveResponse(result: Observable<IncidentMySuffix>) {
        result.subscribe((res: IncidentMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: IncidentMySuffix) {
        this.eventManager.broadcast({ name: 'incidentListModification', content: 'OK'});
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
    selector: 'jhi-incident-my-suffix-popup',
    template: ''
})
export class IncidentMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private incidentPopupService: IncidentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.incidentPopupService
                    .open(IncidentMySuffixDialogComponent as Component, params['id']);
            } else {
                this.incidentPopupService
                    .open(IncidentMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
