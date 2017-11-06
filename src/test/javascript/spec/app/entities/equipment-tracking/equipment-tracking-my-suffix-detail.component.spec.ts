/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SystemGatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EquipmentTrackingMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/equipment-tracking/equipment-tracking-my-suffix-detail.component';
import { EquipmentTrackingMySuffixService } from '../../../../../../main/webapp/app/entities/equipment-tracking/equipment-tracking-my-suffix.service';
import { EquipmentTrackingMySuffix } from '../../../../../../main/webapp/app/entities/equipment-tracking/equipment-tracking-my-suffix.model';

describe('Component Tests', () => {

    describe('EquipmentTrackingMySuffix Management Detail Component', () => {
        let comp: EquipmentTrackingMySuffixDetailComponent;
        let fixture: ComponentFixture<EquipmentTrackingMySuffixDetailComponent>;
        let service: EquipmentTrackingMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayTestModule],
                declarations: [EquipmentTrackingMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EquipmentTrackingMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(EquipmentTrackingMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EquipmentTrackingMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipmentTrackingMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EquipmentTrackingMySuffix('aaa')));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.equipmentTracking).toEqual(jasmine.objectContaining({id: 'aaa'}));
            });
        });
    });

});
