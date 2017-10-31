import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IncidentMySuffix } from './incident-my-suffix.model';
import { IncidentMySuffixPopupService } from './incident-my-suffix-popup.service';
import { IncidentMySuffixService } from './incident-my-suffix.service';

@Component({
    selector: 'jhi-incident-my-suffix-delete-dialog',
    templateUrl: './incident-my-suffix-delete-dialog.component.html'
})
export class IncidentMySuffixDeleteDialogComponent {

    incident: IncidentMySuffix;

    constructor(
        private incidentService: IncidentMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.incidentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'incidentListModification',
                content: 'Deleted an incident'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-incident-my-suffix-delete-popup',
    template: ''
})
export class IncidentMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private incidentPopupService: IncidentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.incidentPopupService
                .open(IncidentMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
