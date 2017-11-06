import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SystemGatewaySharedModule } from '../../shared';
import {
    MemberMySuffixService,
    MemberMySuffixPopupService,
    MemberMySuffixComponent,
    MemberMySuffixDetailComponent,
    MemberMySuffixDialogComponent,
    MemberMySuffixPopupComponent,
    MemberMySuffixDeletePopupComponent,
    MemberMySuffixDeleteDialogComponent,
    memberRoute,
    memberPopupRoute,
    MemberMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...memberRoute,
    ...memberPopupRoute,
];

@NgModule({
    imports: [
        SystemGatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MemberMySuffixComponent,
        MemberMySuffixDetailComponent,
        MemberMySuffixDialogComponent,
        MemberMySuffixDeleteDialogComponent,
        MemberMySuffixPopupComponent,
        MemberMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MemberMySuffixComponent,
        MemberMySuffixDialogComponent,
        MemberMySuffixPopupComponent,
        MemberMySuffixDeleteDialogComponent,
        MemberMySuffixDeletePopupComponent,
    ],
    providers: [
        MemberMySuffixService,
        MemberMySuffixPopupService,
        MemberMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemGatewayMemberMySuffixModule {}
