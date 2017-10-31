/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SystemGatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MemberMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/member/member-my-suffix-detail.component';
import { MemberMySuffixService } from '../../../../../../main/webapp/app/entities/member/member-my-suffix.service';
import { MemberMySuffix } from '../../../../../../main/webapp/app/entities/member/member-my-suffix.model';

describe('Component Tests', () => {

    describe('MemberMySuffix Management Detail Component', () => {
        let comp: MemberMySuffixDetailComponent;
        let fixture: ComponentFixture<MemberMySuffixDetailComponent>;
        let service: MemberMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayTestModule],
                declarations: [MemberMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MemberMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(MemberMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MemberMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MemberMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MemberMySuffix('aaa')));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.member).toEqual(jasmine.objectContaining({id: 'aaa'}));
            });
        });
    });

});
