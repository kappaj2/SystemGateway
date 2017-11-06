import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EquipmentMySuffix } from './equipment-my-suffix.model';
import { EquipmentMySuffixPopupService } from './equipment-my-suffix-popup.service';
import { EquipmentMySuffixService } from './equipment-my-suffix.service';

@Component({
    selector: 'jhi-equipment-my-suffix-dialog',
    templateUrl: './equipment-my-suffix-dialog.component.html'
})
export class EquipmentMySuffixDialogComponent implements OnInit {

    equipment: EquipmentMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private equipmentService: EquipmentMySuffixService,
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
        if (this.equipment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.equipmentService.update(this.equipment));
        } else {
            this.subscribeToSaveResponse(
                this.equipmentService.create(this.equipment));
        }
    }

    private subscribeToSaveResponse(result: Observable<EquipmentMySuffix>) {
        result.subscribe((res: EquipmentMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EquipmentMySuffix) {
        this.eventManager.broadcast({ name: 'equipmentListModification', content: 'OK'});
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
    selector: 'jhi-equipment-my-suffix-popup',
    template: ''
})
export class EquipmentMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private equipmentPopupService: EquipmentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.equipmentPopupService
                    .open(EquipmentMySuffixDialogComponent as Component, params['id']);
            } else {
                this.equipmentPopupService
                    .open(EquipmentMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
