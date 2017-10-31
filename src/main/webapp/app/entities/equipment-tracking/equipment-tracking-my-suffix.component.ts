import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { EquipmentTrackingMySuffix } from './equipment-tracking-my-suffix.model';
import { EquipmentTrackingMySuffixService } from './equipment-tracking-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-equipment-tracking-my-suffix',
    templateUrl: './equipment-tracking-my-suffix.component.html'
})
export class EquipmentTrackingMySuffixComponent implements OnInit, OnDestroy {
equipmentTrackings: EquipmentTrackingMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private equipmentTrackingService: EquipmentTrackingMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.equipmentTrackingService.query().subscribe(
            (res: ResponseWrapper) => {
                this.equipmentTrackings = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEquipmentTrackings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EquipmentTrackingMySuffix) {
        return item.id;
    }
    registerChangeInEquipmentTrackings() {
        this.eventSubscriber = this.eventManager.subscribe('equipmentTrackingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
