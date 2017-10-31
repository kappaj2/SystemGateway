import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EquipmentTrackingMySuffix } from './equipment-tracking-my-suffix.model';
import { EquipmentTrackingMySuffixService } from './equipment-tracking-my-suffix.service';

@Injectable()
export class EquipmentTrackingMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private equipmentTrackingService: EquipmentTrackingMySuffixService

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
                this.equipmentTrackingService.find(id).subscribe((equipmentTracking) => {
                    equipmentTracking.dateOnLoan = this.datePipe
                        .transform(equipmentTracking.dateOnLoan, 'yyyy-MM-ddTHH:mm:ss');
                    equipmentTracking.dateBookedBack = this.datePipe
                        .transform(equipmentTracking.dateBookedBack, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.equipmentTrackingModalRef(component, equipmentTracking);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.equipmentTrackingModalRef(component, new EquipmentTrackingMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    equipmentTrackingModalRef(component: Component, equipmentTracking: EquipmentTrackingMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.equipmentTracking = equipmentTracking;
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
