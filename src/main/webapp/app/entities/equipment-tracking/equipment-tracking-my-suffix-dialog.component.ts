import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EquipmentTrackingMySuffix } from './equipment-tracking-my-suffix.model';
import { EquipmentTrackingMySuffixPopupService } from './equipment-tracking-my-suffix-popup.service';
import { EquipmentTrackingMySuffixService } from './equipment-tracking-my-suffix.service';

@Component({
    selector: 'jhi-equipment-tracking-my-suffix-dialog',
    templateUrl: './equipment-tracking-my-suffix-dialog.component.html'
})
export class EquipmentTrackingMySuffixDialogComponent implements OnInit {

    equipmentTracking: EquipmentTrackingMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private equipmentTrackingService: EquipmentTrackingMySuffixService,
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
        if (this.equipmentTracking.id !== undefined) {
            this.subscribeToSaveResponse(
                this.equipmentTrackingService.update(this.equipmentTracking));
        } else {
            this.subscribeToSaveResponse(
                this.equipmentTrackingService.create(this.equipmentTracking));
        }
    }

    private subscribeToSaveResponse(result: Observable<EquipmentTrackingMySuffix>) {
        result.subscribe((res: EquipmentTrackingMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EquipmentTrackingMySuffix) {
        this.eventManager.broadcast({ name: 'equipmentTrackingListModification', content: 'OK'});
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
    selector: 'jhi-equipment-tracking-my-suffix-popup',
    template: ''
})
export class EquipmentTrackingMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private equipmentTrackingPopupService: EquipmentTrackingMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.equipmentTrackingPopupService
                    .open(EquipmentTrackingMySuffixDialogComponent as Component, params['id']);
            } else {
                this.equipmentTrackingPopupService
                    .open(EquipmentTrackingMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
