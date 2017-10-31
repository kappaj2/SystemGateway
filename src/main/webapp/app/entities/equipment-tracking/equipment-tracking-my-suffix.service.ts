import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { EquipmentTrackingMySuffix } from './equipment-tracking-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EquipmentTrackingMySuffixService {

    private resourceUrl = '/eventmodule/api/equipment-trackings';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(equipmentTracking: EquipmentTrackingMySuffix): Observable<EquipmentTrackingMySuffix> {
        const copy = this.convert(equipmentTracking);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(equipmentTracking: EquipmentTrackingMySuffix): Observable<EquipmentTrackingMySuffix> {
        const copy = this.convert(equipmentTracking);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<EquipmentTrackingMySuffix> {
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
     * Convert a returned JSON object to EquipmentTrackingMySuffix.
     */
    private convertItemFromServer(json: any): EquipmentTrackingMySuffix {
        const entity: EquipmentTrackingMySuffix = Object.assign(new EquipmentTrackingMySuffix(), json);
        entity.dateOnLoan = this.dateUtils
            .convertDateTimeFromServer(json.dateOnLoan);
        entity.dateBookedBack = this.dateUtils
            .convertDateTimeFromServer(json.dateBookedBack);
        return entity;
    }

    /**
     * Convert a EquipmentTrackingMySuffix to a JSON which can be sent to the server.
     */
    private convert(equipmentTracking: EquipmentTrackingMySuffix): EquipmentTrackingMySuffix {
        const copy: EquipmentTrackingMySuffix = Object.assign({}, equipmentTracking);

        copy.dateOnLoan = this.dateUtils.toDate(equipmentTracking.dateOnLoan);

        copy.dateBookedBack = this.dateUtils.toDate(equipmentTracking.dateBookedBack);
        return copy;
    }
}
