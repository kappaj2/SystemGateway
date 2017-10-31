import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { MemberMySuffix } from './member-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MemberMySuffixService {

    private resourceUrl = '/eventmodule/api/members';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(member: MemberMySuffix): Observable<MemberMySuffix> {
        const copy = this.convert(member);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(member: MemberMySuffix): Observable<MemberMySuffix> {
        const copy = this.convert(member);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<MemberMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to MemberMySuffix.
     */
    private convertItemFromServer(json: any): MemberMySuffix {
        const entity: MemberMySuffix = Object.assign(new MemberMySuffix(), json);
        entity.dateCreated = this.dateUtils
            .convertDateTimeFromServer(json.dateCreated);
        entity.dateModified = this.dateUtils
            .convertDateTimeFromServer(json.dateModified);
        return entity;
    }

    /**
     * Convert a MemberMySuffix to a JSON which can be sent to the server.
     */
    private convert(member: MemberMySuffix): MemberMySuffix {
        const copy: MemberMySuffix = Object.assign({}, member);

        copy.dateCreated = this.dateUtils.toDate(member.dateCreated);

        copy.dateModified = this.dateUtils.toDate(member.dateModified);
        return copy;
    }
}
