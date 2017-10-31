import { BaseEntity } from './../../shared';

export const enum Priority {
    'LOW',
    'MEDIUM',
    'HIGH'
}

export class IncidentProgressMySuffix implements BaseEntity {
    constructor(
        public id?: string,
        public incidentNumber?: number,
        public progressNumber?: number,
        public updatedBy?: string,
        public dateUpdated?: any,
        public updatedPriority?: Priority,
        public progressDescription?: string,
        public loanEquipment?: string,
    ) {
    }
}
