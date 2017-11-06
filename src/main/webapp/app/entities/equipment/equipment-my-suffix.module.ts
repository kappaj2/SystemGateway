import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SystemGatewaySharedModule } from '../../shared';
import {
    EquipmentMySuffixService,
    EquipmentMySuffixPopupService,
    EquipmentMySuffixComponent,
    EquipmentMySuffixDetailComponent,
    EquipmentMySuffixDialogComponent,
    EquipmentMySuffixPopupComponent,
    EquipmentMySuffixDeletePopupComponent,
    EquipmentMySuffixDeleteDialogComponent,
    equipmentRoute,
    equipmentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...equipmentRoute,
    ...equipmentPopupRoute,
];

@NgModule({
    imports: [
        SystemGatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EquipmentMySuffixComponent,
        EquipmentMySuffixDetailComponent,
        EquipmentMySuffixDialogComponent,
        EquipmentMySuffixDeleteDialogComponent,
        EquipmentMySuffixPopupComponent,
        EquipmentMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EquipmentMySuffixComponent,
        EquipmentMySuffixDialogComponent,
        EquipmentMySuffixPopupComponent,
        EquipmentMySuffixDeleteDialogComponent,
        EquipmentMySuffixDeletePopupComponent,
    ],
    providers: [
        EquipmentMySuffixService,
        EquipmentMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemGatewayEquipmentMySuffixModule {}
