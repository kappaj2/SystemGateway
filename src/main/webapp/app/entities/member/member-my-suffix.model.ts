import { BaseEntity } from './../../shared';

export class MemberMySuffix implements BaseEntity {
    constructor(
        public id?: string,
        public memberKey?: string,
        public memberName?: string,
        public memberSurname?: string,
        public dateCreated?: any,
        public dateModified?: any,
        public updatedBy?: string,
    ) {
    }
}
