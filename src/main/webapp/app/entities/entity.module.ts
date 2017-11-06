import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SystemGatewayMemberMySuffixModule } from './member/member-my-suffix.module';
import { SystemGatewayEquipmentMySuffixModule } from './equipment/equipment-my-suffix.module';
import { SystemGatewayEquipmentTrackingMySuffixModule } from './equipment-tracking/equipment-tracking-my-suffix.module';
import { SystemGatewayIncidentMySuffixModule } from './incident/incident-my-suffix.module';
import { SystemGatewayIncidentProgressMySuffixModule } from './incident-progress/incident-progress-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SystemGatewayMemberMySuffixModule,
        SystemGatewayEquipmentMySuffixModule,
        SystemGatewayEquipmentTrackingMySuffixModule,
        SystemGatewayIncidentMySuffixModule,
        SystemGatewayIncidentProgressMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemGatewayEntityModule {}
