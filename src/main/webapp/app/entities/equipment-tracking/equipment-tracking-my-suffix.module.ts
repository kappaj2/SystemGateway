import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SystemGatewaySharedModule } from '../../shared';
import {
    EquipmentTrackingMySuffixService,
    EquipmentTrackingMySuffixPopupService,
    EquipmentTrackingMySuffixComponent,
    EquipmentTrackingMySuffixDetailComponent,
    EquipmentTrackingMySuffixDialogComponent,
    EquipmentTrackingMySuffixPopupComponent,
    EquipmentTrackingMySuffixDeletePopupComponent,
    EquipmentTrackingMySuffixDeleteDialogComponent,
    equipmentTrackingRoute,
    equipmentTrackingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...equipmentTrackingRoute,
    ...equipmentTrackingPopupRoute,
];

@NgModule({
    imports: [
        SystemGatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EquipmentTrackingMySuffixComponent,
        EquipmentTrackingMySuffixDetailComponent,
        EquipmentTrackingMySuffixDialogComponent,
        EquipmentTrackingMySuffixDeleteDialogComponent,
        EquipmentTrackingMySuffixPopupComponent,
        EquipmentTrackingMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EquipmentTrackingMySuffixComponent,
        EquipmentTrackingMySuffixDialogComponent,
        EquipmentTrackingMySuffixPopupComponent,
        EquipmentTrackingMySuffixDeleteDialogComponent,
        EquipmentTrackingMySuffixDeletePopupComponent,
    ],
    providers: [
        EquipmentTrackingMySuffixService,
        EquipmentTrackingMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemGatewayEquipmentTrackingMySuffixModule {}
