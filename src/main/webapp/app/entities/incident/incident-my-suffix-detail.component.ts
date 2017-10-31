import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { IncidentMySuffix } from './incident-my-suffix.model';
import { IncidentMySuffixService } from './incident-my-suffix.service';

@Component({
    selector: 'jhi-incident-my-suffix-detail',
    templateUrl: './incident-my-suffix-detail.component.html'
})
export class IncidentMySuffixDetailComponent implements OnInit, OnDestroy {

    incident: IncidentMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private incidentService: IncidentMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIncidents();
    }

    load(id) {
        this.incidentService.find(id).subscribe((incident) => {
            this.incident = incident;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIncidents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'incidentListModification',
            (response) => this.load(this.incident.id)
        );
    }
}
