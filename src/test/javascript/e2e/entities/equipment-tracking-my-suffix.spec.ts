import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('EquipmentTracking e2e test', () => {

    let navBarPage: NavBarPage;
    let equipmentTrackingDialogPage: EquipmentTrackingDialogPage;
    let equipmentTrackingComponentsPage: EquipmentTrackingComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load EquipmentTrackings', () => {
        navBarPage.goToEntity('equipment-tracking-my-suffix');
        equipmentTrackingComponentsPage = new EquipmentTrackingComponentsPage();
        expect(equipmentTrackingComponentsPage.getTitle()).toMatch(/systemGatewayApp.equipmentTracking.home.title/);

    });

    it('should load create EquipmentTracking dialog', () => {
        equipmentTrackingComponentsPage.clickOnCreateButton();
        equipmentTrackingDialogPage = new EquipmentTrackingDialogPage();
        expect(equipmentTrackingDialogPage.getModalTitle()).toMatch(/systemGatewayApp.equipmentTracking.home.createOrEditLabel/);
        equipmentTrackingDialogPage.close();
    });

    it('should create and save EquipmentTrackings', () => {
        equipmentTrackingComponentsPage.clickOnCreateButton();
        equipmentTrackingDialogPage.setEquipmentIdInput('equipmentId');
        expect(equipmentTrackingDialogPage.getEquipmentIdInput()).toMatch('equipmentId');
        equipmentTrackingDialogPage.setTrackingIdInput('5');
        expect(equipmentTrackingDialogPage.getTrackingIdInput()).toMatch('5');
        equipmentTrackingDialogPage.setDateOnLoanInput(12310020012301);
        expect(equipmentTrackingDialogPage.getDateOnLoanInput()).toMatch('2001-12-31T02:30');
        equipmentTrackingDialogPage.setBookedOutByInput('bookedOutBy');
        expect(equipmentTrackingDialogPage.getBookedOutByInput()).toMatch('bookedOutBy');
        equipmentTrackingDialogPage.setDateBookedBackInput(12310020012301);
        expect(equipmentTrackingDialogPage.getDateBookedBackInput()).toMatch('2001-12-31T02:30');
        equipmentTrackingDialogPage.setBookedInByInput('bookedInBy');
        expect(equipmentTrackingDialogPage.getBookedInByInput()).toMatch('bookedInBy');
        equipmentTrackingDialogPage.save();
        expect(equipmentTrackingDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EquipmentTrackingComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-equipment-tracking-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EquipmentTrackingDialogPage {
    modalTitle = element(by.css('h4#myEquipmentTrackingLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    equipmentIdInput = element(by.css('input#field_equipmentId'));
    trackingIdInput = element(by.css('input#field_trackingId'));
    dateOnLoanInput = element(by.css('input#field_dateOnLoan'));
    bookedOutByInput = element(by.css('input#field_bookedOutBy'));
    dateBookedBackInput = element(by.css('input#field_dateBookedBack'));
    bookedInByInput = element(by.css('input#field_bookedInBy'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setEquipmentIdInput = function (equipmentId) {
        this.equipmentIdInput.sendKeys(equipmentId);
    }

    getEquipmentIdInput = function () {
        return this.equipmentIdInput.getAttribute('value');
    }

    setTrackingIdInput = function (trackingId) {
        this.trackingIdInput.sendKeys(trackingId);
    }

    getTrackingIdInput = function () {
        return this.trackingIdInput.getAttribute('value');
    }

    setDateOnLoanInput = function (dateOnLoan) {
        this.dateOnLoanInput.sendKeys(dateOnLoan);
    }

    getDateOnLoanInput = function () {
        return this.dateOnLoanInput.getAttribute('value');
    }

    setBookedOutByInput = function (bookedOutBy) {
        this.bookedOutByInput.sendKeys(bookedOutBy);
    }

    getBookedOutByInput = function () {
        return this.bookedOutByInput.getAttribute('value');
    }

    setDateBookedBackInput = function (dateBookedBack) {
        this.dateBookedBackInput.sendKeys(dateBookedBack);
    }

    getDateBookedBackInput = function () {
        return this.dateBookedBackInput.getAttribute('value');
    }

    setBookedInByInput = function (bookedInBy) {
        this.bookedInByInput.sendKeys(bookedInBy);
    }

    getBookedInByInput = function () {
        return this.bookedInByInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
