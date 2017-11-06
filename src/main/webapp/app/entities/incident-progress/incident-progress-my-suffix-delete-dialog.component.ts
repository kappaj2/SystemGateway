import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IncidentProgressMySuffix } from './incident-progress-my-suffix.model';
import { IncidentProgressMySuffixPopupService } from './incident-progress-my-suffix-popup.service';
import { IncidentProgressMySuffixService } from './incident-progress-my-suffix.service';

@Component({
    selector: 'jhi-incident-progress-my-suffix-delete-dialog',
    templateUrl: './incident-progress-my-suffix-delete-dialog.component.html'
})
export class IncidentProgressMySuffixDeleteDialogComponent {

    incidentProgress: IncidentProgressMySuffix;

    constructor(
        private incidentProgressService: IncidentProgressMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.incidentProgressService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'incidentProgressListModification',
                content: 'Deleted an incidentProgress'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-incident-progress-my-suffix-delete-popup',
    template: ''
})
export class IncidentProgressMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private incidentProgressPopupService: IncidentProgressMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.incidentProgressPopupService
                .open(IncidentProgressMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
