import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { IncidentMySuffix } from './incident-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class IncidentMySuffixService {

    private resourceUrl = '/eventmodule/api/incidents';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(incident: IncidentMySuffix): Observable<IncidentMySuffix> {
        const copy = this.convert(incident);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(incident: IncidentMySuffix): Observable<IncidentMySuffix> {
        const copy = this.convert(incident);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<IncidentMySuffix> {
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
     * Convert a returned JSON object to IncidentMySuffix.
     */
    private convertItemFromServer(json: any): IncidentMySuffix {
        const entity: IncidentMySuffix = Object.assign(new IncidentMySuffix(), json);
        entity.dateLogged = this.dateUtils
            .convertDateTimeFromServer(json.dateLogged);
        return entity;
    }

    /**
     * Convert a IncidentMySuffix to a JSON which can be sent to the server.
     */
    private convert(incident: IncidentMySuffix): IncidentMySuffix {
        const copy: IncidentMySuffix = Object.assign({}, incident);

        copy.dateLogged = this.dateUtils.toDate(incident.dateLogged);
        return copy;
    }
}
