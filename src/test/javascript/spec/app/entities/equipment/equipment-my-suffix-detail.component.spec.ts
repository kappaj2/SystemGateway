/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SystemGatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EquipmentMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/equipment/equipment-my-suffix-detail.component';
import { EquipmentMySuffixService } from '../../../../../../main/webapp/app/entities/equipment/equipment-my-suffix.service';
import { EquipmentMySuffix } from '../../../../../../main/webapp/app/entities/equipment/equipment-my-suffix.model';

describe('Component Tests', () => {

    describe('EquipmentMySuffix Management Detail Component', () => {
        let comp: EquipmentMySuffixDetailComponent;
        let fixture: ComponentFixture<EquipmentMySuffixDetailComponent>;
        let service: EquipmentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayTestModule],
                declarations: [EquipmentMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EquipmentMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(EquipmentMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EquipmentMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipmentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EquipmentMySuffix('aaa')));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.equipment).toEqual(jasmine.objectContaining({id: 'aaa'}));
            });
        });
    });

});
