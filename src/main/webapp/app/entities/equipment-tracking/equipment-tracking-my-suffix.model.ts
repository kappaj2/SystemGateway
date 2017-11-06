import { BaseEntity } from './../../shared';

export class EquipmentTrackingMySuffix implements BaseEntity {
    constructor(
        public id?: string,
        public equipmentId?: string,
        public trackingId?: number,
        public dateOnLoan?: any,
        public bookedOutBy?: string,
        public dateBookedBack?: any,
        public bookedInBy?: string,
    ) {
    }
}
