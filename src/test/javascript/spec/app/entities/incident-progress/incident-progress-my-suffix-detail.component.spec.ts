/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SystemGatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { IncidentProgressMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/incident-progress/incident-progress-my-suffix-detail.component';
import { IncidentProgressMySuffixService } from '../../../../../../main/webapp/app/entities/incident-progress/incident-progress-my-suffix.service';
import { IncidentProgressMySuffix } from '../../../../../../main/webapp/app/entities/incident-progress/incident-progress-my-suffix.model';

describe('Component Tests', () => {

    describe('IncidentProgressMySuffix Management Detail Component', () => {
        let comp: IncidentProgressMySuffixDetailComponent;
        let fixture: ComponentFixture<IncidentProgressMySuffixDetailComponent>;
        let service: IncidentProgressMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayTestModule],
                declarations: [IncidentProgressMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    IncidentProgressMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(IncidentProgressMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IncidentProgressMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncidentProgressMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new IncidentProgressMySuffix('aaa')));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.incidentProgress).toEqual(jasmine.objectContaining({id: 'aaa'}));
            });
        });
    });

});
