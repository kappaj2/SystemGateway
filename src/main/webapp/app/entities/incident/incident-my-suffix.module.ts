import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SystemGatewaySharedModule } from '../../shared';
import {
    IncidentMySuffixService,
    IncidentMySuffixPopupService,
    IncidentMySuffixComponent,
    IncidentMySuffixDetailComponent,
    IncidentMySuffixDialogComponent,
    IncidentMySuffixPopupComponent,
    IncidentMySuffixDeletePopupComponent,
    IncidentMySuffixDeleteDialogComponent,
    incidentRoute,
    incidentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...incidentRoute,
    ...incidentPopupRoute,
];

@NgModule({
    imports: [
        SystemGatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        IncidentMySuffixComponent,
        IncidentMySuffixDetailComponent,
        IncidentMySuffixDialogComponent,
        IncidentMySuffixDeleteDialogComponent,
        IncidentMySuffixPopupComponent,
        IncidentMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        IncidentMySuffixComponent,
        IncidentMySuffixDialogComponent,
        IncidentMySuffixPopupComponent,
        IncidentMySuffixDeleteDialogComponent,
        IncidentMySuffixDeletePopupComponent,
    ],
    providers: [
        IncidentMySuffixService,
        IncidentMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemGatewayIncidentMySuffixModule {}
