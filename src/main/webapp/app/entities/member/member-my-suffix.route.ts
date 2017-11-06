import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MemberMySuffixComponent } from './member-my-suffix.component';
import { MemberMySuffixDetailComponent } from './member-my-suffix-detail.component';
import { MemberMySuffixPopupComponent } from './member-my-suffix-dialog.component';
import { MemberMySuffixDeletePopupComponent } from './member-my-suffix-delete-dialog.component';

@Injectable()
export class MemberMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const memberRoute: Routes = [
    {
        path: 'member-my-suffix',
        component: MemberMySuffixComponent,
        resolve: {
            'pagingParams': MemberMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.member.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'member-my-suffix/:id',
        component: MemberMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.member.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const memberPopupRoute: Routes = [
    {
        path: 'member-my-suffix-new',
        component: MemberMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.member.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'member-my-suffix/:id/edit',
        component: MemberMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.member.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'member-my-suffix/:id/delete',
        component: MemberMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.member.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
