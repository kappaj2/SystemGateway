import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EquipmentTrackingMySuffix } from './equipment-tracking-my-suffix.model';
import { EquipmentTrackingMySuffixService } from './equipment-tracking-my-suffix.service';

@Component({
    selector: 'jhi-equipment-tracking-my-suffix-detail',
    templateUrl: './equipment-tracking-my-suffix-detail.component.html'
})
export class EquipmentTrackingMySuffixDetailComponent implements OnInit, OnDestroy {

    equipmentTracking: EquipmentTrackingMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private equipmentTrackingService: EquipmentTrackingMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEquipmentTrackings();
    }

    load(id) {
        this.equipmentTrackingService.find(id).subscribe((equipmentTracking) => {
            this.equipmentTracking = equipmentTracking;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEquipmentTrackings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'equipmentTrackingListModification',
            (response) => this.load(this.equipmentTracking.id)
        );
    }
}
