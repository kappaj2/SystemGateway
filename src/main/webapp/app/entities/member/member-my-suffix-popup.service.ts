import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MemberMySuffix } from './member-my-suffix.model';
import { MemberMySuffixService } from './member-my-suffix.service';

@Injectable()
export class MemberMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private memberService: MemberMySuffixService

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
                this.memberService.find(id).subscribe((member) => {
                    member.dateCreated = this.datePipe
                        .transform(member.dateCreated, 'yyyy-MM-ddTHH:mm:ss');
                    member.dateModified = this.datePipe
                        .transform(member.dateModified, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.memberModalRef(component, member);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.memberModalRef(component, new MemberMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    memberModalRef(component: Component, member: MemberMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.member = member;
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
