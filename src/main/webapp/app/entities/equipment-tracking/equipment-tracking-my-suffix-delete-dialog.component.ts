import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EquipmentTrackingMySuffix } from './equipment-tracking-my-suffix.model';
import { EquipmentTrackingMySuffixPopupService } from './equipment-tracking-my-suffix-popup.service';
import { EquipmentTrackingMySuffixService } from './equipment-tracking-my-suffix.service';

@Component({
    selector: 'jhi-equipment-tracking-my-suffix-delete-dialog',
    templateUrl: './equipment-tracking-my-suffix-delete-dialog.component.html'
})
export class EquipmentTrackingMySuffixDeleteDialogComponent {

    equipmentTracking: EquipmentTrackingMySuffix;

    constructor(
        private equipmentTrackingService: EquipmentTrackingMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.equipmentTrackingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'equipmentTrackingListModification',
                content: 'Deleted an equipmentTracking'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-equipment-tracking-my-suffix-delete-popup',
    template: ''
})
export class EquipmentTrackingMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private equipmentTrackingPopupService: EquipmentTrackingMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.equipmentTrackingPopupService
                .open(EquipmentTrackingMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
