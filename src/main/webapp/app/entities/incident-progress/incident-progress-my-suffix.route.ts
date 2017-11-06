import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { IncidentProgressMySuffixComponent } from './incident-progress-my-suffix.component';
import { IncidentProgressMySuffixDetailComponent } from './incident-progress-my-suffix-detail.component';
import { IncidentProgressMySuffixPopupComponent } from './incident-progress-my-suffix-dialog.component';
import { IncidentProgressMySuffixDeletePopupComponent } from './incident-progress-my-suffix-delete-dialog.component';

export const incidentProgressRoute: Routes = [
    {
        path: 'incident-progress-my-suffix',
        component: IncidentProgressMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.incidentProgress.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'incident-progress-my-suffix/:id',
        component: IncidentProgressMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.incidentProgress.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const incidentProgressPopupRoute: Routes = [
    {
        path: 'incident-progress-my-suffix-new',
        component: IncidentProgressMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.incidentProgress.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'incident-progress-my-suffix/:id/edit',
        component: IncidentProgressMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.incidentProgress.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'incident-progress-my-suffix/:id/delete',
        component: IncidentProgressMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.incidentProgress.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
