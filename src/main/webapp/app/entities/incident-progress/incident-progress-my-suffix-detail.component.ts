import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { IncidentProgressMySuffix } from './incident-progress-my-suffix.model';
import { IncidentProgressMySuffixService } from './incident-progress-my-suffix.service';

@Component({
    selector: 'jhi-incident-progress-my-suffix-detail',
    templateUrl: './incident-progress-my-suffix-detail.component.html'
})
export class IncidentProgressMySuffixDetailComponent implements OnInit, OnDestroy {

    incidentProgress: IncidentProgressMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private incidentProgressService: IncidentProgressMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIncidentProgresses();
    }

    load(id) {
        this.incidentProgressService.find(id).subscribe((incidentProgress) => {
            this.incidentProgress = incidentProgress;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIncidentProgresses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'incidentProgressListModification',
            (response) => this.load(this.incidentProgress.id)
        );
    }
}
