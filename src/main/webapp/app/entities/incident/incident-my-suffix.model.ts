import { BaseEntity } from './../../shared';

export const enum Priority {
    'LOW',
    'MEDIUM',
    'HIGH'
}

export const enum IncidentStatus {
    'OPEN',
    'PENDING_PARTS',
    'IN_PROGRESS',
    'CLOSED'
}

export class IncidentMySuffix implements BaseEntity {
    constructor(
        public id?: string,
        public companyKey?: string,
        public incidentNumber?: number,
        public loggedBy?: string,
        public dateLogged?: any,
        public priority?: Priority,
        public incidentStatus?: IncidentStatus,
        public incidentDescription?: string,
        public screenCaptureContentType?: string,
        public screenCapture?: any,
    ) {
    }
}
