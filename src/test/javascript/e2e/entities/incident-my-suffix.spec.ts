import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Incident e2e test', () => {

    let navBarPage: NavBarPage;
    let incidentDialogPage: IncidentDialogPage;
    let incidentComponentsPage: IncidentComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Incidents', () => {
        navBarPage.goToEntity('incident-my-suffix');
        incidentComponentsPage = new IncidentComponentsPage();
        expect(incidentComponentsPage.getTitle()).toMatch(/systemGatewayApp.incident.home.title/);

    });

    it('should load create Incident dialog', () => {
        incidentComponentsPage.clickOnCreateButton();
        incidentDialogPage = new IncidentDialogPage();
        expect(incidentDialogPage.getModalTitle()).toMatch(/systemGatewayApp.incident.home.createOrEditLabel/);
        incidentDialogPage.close();
    });

    it('should create and save Incidents', () => {
        incidentComponentsPage.clickOnCreateButton();
        incidentDialogPage.setCompanyKeyInput('companyKey');
        expect(incidentDialogPage.getCompanyKeyInput()).toMatch('companyKey');
        incidentDialogPage.setIncidentNumberInput('5');
        expect(incidentDialogPage.getIncidentNumberInput()).toMatch('5');
        incidentDialogPage.setLoggedByInput('loggedBy');
        expect(incidentDialogPage.getLoggedByInput()).toMatch('loggedBy');
        incidentDialogPage.setDateLoggedInput(12310020012301);
        expect(incidentDialogPage.getDateLoggedInput()).toMatch('2001-12-31T02:30');
        incidentDialogPage.prioritySelectLastOption();
        incidentDialogPage.incidentStatusSelectLastOption();
        incidentDialogPage.setIncidentDescriptionInput('incidentDescription');
        expect(incidentDialogPage.getIncidentDescriptionInput()).toMatch('incidentDescription');
        incidentDialogPage.setScreenCaptureInput(absolutePath);
        incidentDialogPage.save();
        expect(incidentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class IncidentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-incident-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class IncidentDialogPage {
    modalTitle = element(by.css('h4#myIncidentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    companyKeyInput = element(by.css('input#field_companyKey'));
    incidentNumberInput = element(by.css('input#field_incidentNumber'));
    loggedByInput = element(by.css('input#field_loggedBy'));
    dateLoggedInput = element(by.css('input#field_dateLogged'));
    prioritySelect = element(by.css('select#field_priority'));
    incidentStatusSelect = element(by.css('select#field_incidentStatus'));
    incidentDescriptionInput = element(by.css('input#field_incidentDescription'));
    screenCaptureInput = element(by.css('input#file_screenCapture'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCompanyKeyInput = function (companyKey) {
        this.companyKeyInput.sendKeys(companyKey);
    }

    getCompanyKeyInput = function () {
        return this.companyKeyInput.getAttribute('value');
    }

    setIncidentNumberInput = function (incidentNumber) {
        this.incidentNumberInput.sendKeys(incidentNumber);
    }

    getIncidentNumberInput = function () {
        return this.incidentNumberInput.getAttribute('value');
    }

    setLoggedByInput = function (loggedBy) {
        this.loggedByInput.sendKeys(loggedBy);
    }

    getLoggedByInput = function () {
        return this.loggedByInput.getAttribute('value');
    }

    setDateLoggedInput = function (dateLogged) {
        this.dateLoggedInput.sendKeys(dateLogged);
    }

    getDateLoggedInput = function () {
        return this.dateLoggedInput.getAttribute('value');
    }

    setPrioritySelect = function (priority) {
        this.prioritySelect.sendKeys(priority);
    }

    getPrioritySelect = function () {
        return this.prioritySelect.element(by.css('option:checked')).getText();
    }

    prioritySelectLastOption = function () {
        this.prioritySelect.all(by.tagName('option')).last().click();
    }
    setIncidentStatusSelect = function (incidentStatus) {
        this.incidentStatusSelect.sendKeys(incidentStatus);
    }

    getIncidentStatusSelect = function () {
        return this.incidentStatusSelect.element(by.css('option:checked')).getText();
    }

    incidentStatusSelectLastOption = function () {
        this.incidentStatusSelect.all(by.tagName('option')).last().click();
    }
    setIncidentDescriptionInput = function (incidentDescription) {
        this.incidentDescriptionInput.sendKeys(incidentDescription);
    }

    getIncidentDescriptionInput = function () {
        return this.incidentDescriptionInput.getAttribute('value');
    }

    setScreenCaptureInput = function (screenCapture) {
        this.screenCaptureInput.sendKeys(screenCapture);
    }

    getScreenCaptureInput = function () {
        return this.screenCaptureInput.getAttribute('value');
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
