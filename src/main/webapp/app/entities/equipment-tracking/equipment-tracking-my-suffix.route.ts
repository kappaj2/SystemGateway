import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EquipmentTrackingMySuffixComponent } from './equipment-tracking-my-suffix.component';
import { EquipmentTrackingMySuffixDetailComponent } from './equipment-tracking-my-suffix-detail.component';
import { EquipmentTrackingMySuffixPopupComponent } from './equipment-tracking-my-suffix-dialog.component';
import { EquipmentTrackingMySuffixDeletePopupComponent } from './equipment-tracking-my-suffix-delete-dialog.component';

export const equipmentTrackingRoute: Routes = [
    {
        path: 'equipment-tracking-my-suffix',
        component: EquipmentTrackingMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.equipmentTracking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'equipment-tracking-my-suffix/:id',
        component: EquipmentTrackingMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.equipmentTracking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const equipmentTrackingPopupRoute: Routes = [
    {
        path: 'equipment-tracking-my-suffix-new',
        component: EquipmentTrackingMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.equipmentTracking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'equipment-tracking-my-suffix/:id/edit',
        component: EquipmentTrackingMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.equipmentTracking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'equipment-tracking-my-suffix/:id/delete',
        component: EquipmentTrackingMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayApp.equipmentTracking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
