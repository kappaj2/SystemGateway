import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { IncidentMySuffixComponent } from './incident-my-suffix.component';
import { IncidentMySuffixDetailComponent } from './incident-my-suffix-detail.component';
import { IncidentMySuffixPopupComponent } from './incident-my-suffix-dialog.component';
import { IncidentMySuffixDeletePopupComponent } from './incident-my-suffix-delete-dialog.component';

export const incidentRoute: Routes = [
    {
        path: 'incident-my-suffix',
        component: IncidentMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'incident-my-suffix/:id',
        component: IncidentMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const incidentPopupRoute: Routes = [
    {
        path: 'incident-my-suffix-new',
        component: IncidentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'incident-my-suffix/:id/edit',
        component: IncidentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'incident-my-suffix/:id/delete',
        component: IncidentMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
