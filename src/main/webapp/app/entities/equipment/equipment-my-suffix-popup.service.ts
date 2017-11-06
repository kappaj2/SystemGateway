import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EquipmentMySuffix } from './equipment-my-suffix.model';
import { EquipmentMySuffixService } from './equipment-my-suffix.service';

@Injectable()
export class EquipmentMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private equipmentService: EquipmentMySuffixService

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
                this.equipmentService.find(id).subscribe((equipment) => {
                    equipment.dateLoadedOnSystem = this.datePipe
                        .transform(equipment.dateLoadedOnSystem, 'yyyy-MM-ddTHH:mm:ss');
                    equipment.dateCreated = this.datePipe
                        .transform(equipment.dateCreated, 'yyyy-MM-ddTHH:mm:ss');
                    equipment.dateModified = this.datePipe
                        .transform(equipment.dateModified, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.equipmentModalRef(component, equipment);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.equipmentModalRef(component, new EquipmentMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    equipmentModalRef(component: Component, equipment: EquipmentMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.equipment = equipment;
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
