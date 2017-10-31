/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SystemGatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { IncidentMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/incident/incident-my-suffix-detail.component';
import { IncidentMySuffixService } from '../../../../../../main/webapp/app/entities/incident/incident-my-suffix.service';
import { IncidentMySuffix } from '../../../../../../main/webapp/app/entities/incident/incident-my-suffix.model';

describe('Component Tests', () => {

    describe('IncidentMySuffix Management Detail Component', () => {
        let comp: IncidentMySuffixDetailComponent;
        let fixture: ComponentFixture<IncidentMySuffixDetailComponent>;
        let service: IncidentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayTestModule],
                declarations: [IncidentMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    IncidentMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(IncidentMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IncidentMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncidentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new IncidentMySuffix('aaa')));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.incident).toEqual(jasmine.objectContaining({id: 'aaa'}));
            });
        });
    });

});
