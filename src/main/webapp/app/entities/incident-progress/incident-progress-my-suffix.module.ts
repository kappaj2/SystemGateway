import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SystemGatewaySharedModule } from '../../shared';
import {
    IncidentProgressMySuffixService,
    IncidentProgressMySuffixPopupService,
    IncidentProgressMySuffixComponent,
    IncidentProgressMySuffixDetailComponent,
    IncidentProgressMySuffixDialogComponent,
    IncidentProgressMySuffixPopupComponent,
    IncidentProgressMySuffixDeletePopupComponent,
    IncidentProgressMySuffixDeleteDialogComponent,
    incidentProgressRoute,
    incidentProgressPopupRoute,
} from './';

const ENTITY_STATES = [
    ...incidentProgressRoute,
    ...incidentProgressPopupRoute,
];

@NgModule({
    imports: [
        SystemGatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        IncidentProgressMySuffixComponent,
        IncidentProgressMySuffixDetailComponent,
        IncidentProgressMySuffixDialogComponent,
        IncidentProgressMySuffixDeleteDialogComponent,
        IncidentProgressMySuffixPopupComponent,
        IncidentProgressMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        IncidentProgressMySuffixComponent,
        IncidentProgressMySuffixDialogComponent,
        IncidentProgressMySuffixPopupComponent,
        IncidentProgressMySuffixDeleteDialogComponent,
        IncidentProgressMySuffixDeletePopupComponent,
    ],
    providers: [
        IncidentProgressMySuffixService,
        IncidentProgressMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemGatewayIncidentProgressMySuffixModule {}
