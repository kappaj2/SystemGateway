import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { IncidentProgressMySuffix } from './incident-progress-my-suffix.model';
import { IncidentProgressMySuffixService } from './incident-progress-my-suffix.service';

@Injectable()
export class IncidentProgressMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private incidentProgressService: IncidentProgressMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.incidentProgressService.find(id).subscribe((incidentProgress) => {
                    incidentProgress.dateUpdated = this.datePipe
                        .transform(incidentProgress.dateUpdated, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.incidentProgressModalRef(component, incidentProgress);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.incidentProgressModalRef(component, new IncidentProgressMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    incidentProgressModalRef(component: Component, incidentProgress: IncidentProgressMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.incidentProgress = incidentProgress;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
