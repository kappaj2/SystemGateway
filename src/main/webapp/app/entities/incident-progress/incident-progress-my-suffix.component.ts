import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IncidentProgressMySuffix } from './incident-progress-my-suffix.model';
import { IncidentProgressMySuffixService } from './incident-progress-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-incident-progress-my-suffix',
    templateUrl: './incident-progress-my-suffix.component.html'
})
export class IncidentProgressMySuffixComponent implements OnInit, OnDestroy {
incidentProgresses: IncidentProgressMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private incidentProgressService: IncidentProgressMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.incidentProgressService.query().subscribe(
            (res: ResponseWrapper) => {
                this.incidentProgresses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIncidentProgresses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IncidentProgressMySuffix) {
        return item.id;
    }
    registerChangeInIncidentProgresses() {
        this.eventSubscriber = this.eventManager.subscribe('incidentProgressListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
