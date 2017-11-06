import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { IncidentProgressMySuffix } from './incident-progress-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class IncidentProgressMySuffixService {

    private resourceUrl = '/eventmodule/api/incident-progresses';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(incidentProgress: IncidentProgressMySuffix): Observable<IncidentProgressMySuffix> {
        const copy = this.convert(incidentProgress);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(incidentProgress: IncidentProgressMySuffix): Observable<IncidentProgressMySuffix> {
        const copy = this.convert(incidentProgress);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<IncidentProgressMySuffix> {
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
     * Convert a returned JSON object to IncidentProgressMySuffix.
     */
    private convertItemFromServer(json: any): IncidentProgressMySuffix {
        const entity: IncidentProgressMySuffix = Object.assign(new IncidentProgressMySuffix(), json);
        entity.dateUpdated = this.dateUtils
            .convertDateTimeFromServer(json.dateUpdated);
        return entity;
    }

    /**
     * Convert a IncidentProgressMySuffix to a JSON which can be sent to the server.
     */
    private convert(incidentProgress: IncidentProgressMySuffix): IncidentProgressMySuffix {
        const copy: IncidentProgressMySuffix = Object.assign({}, incidentProgress);

        copy.dateUpdated = this.dateUtils.toDate(incidentProgress.dateUpdated);
        return copy;
    }
}
