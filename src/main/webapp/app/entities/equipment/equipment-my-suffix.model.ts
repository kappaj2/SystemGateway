import { BaseEntity } from './../../shared';

export const enum EquipmentStatus {
    'AVAILABLE',
    'ON_LOAN',
    'REMOVED'
}

export class EquipmentMySuffix implements BaseEntity {
    constructor(
        public id?: string,
        public equipmentId?: string,
        public equipmentName?: string,
        public dateLoadedOnSystem?: any,
        public uploadedBy?: string,
        public currentStatus?: EquipmentStatus,
        public dateCreated?: any,
        public dateModified?: any,
        public updatedBy?: string,
    ) {
    }
}
