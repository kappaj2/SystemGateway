import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('IncidentProgress e2e test', () => {

    let navBarPage: NavBarPage;
    let incidentProgressDialogPage: IncidentProgressDialogPage;
    let incidentProgressComponentsPage: IncidentProgressComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load IncidentProgresses', () => {
        navBarPage.goToEntity('incident-progress-my-suffix');
        incidentProgressComponentsPage = new IncidentProgressComponentsPage();
        expect(incidentProgressComponentsPage.getTitle()).toMatch(/systemGatewayApp.incidentProgress.home.title/);

    });

    it('should load create IncidentProgress dialog', () => {
        incidentProgressComponentsPage.clickOnCreateButton();
        incidentProgressDialogPage = new IncidentProgressDialogPage();
        expect(incidentProgressDialogPage.getModalTitle()).toMatch(/systemGatewayApp.incidentProgress.home.createOrEditLabel/);
        incidentProgressDialogPage.close();
    });

    it('should create and save IncidentProgresses', () => {
        incidentProgressComponentsPage.clickOnCreateButton();
        incidentProgressDialogPage.setIncidentNumberInput('5');
        expect(incidentProgressDialogPage.getIncidentNumberInput()).toMatch('5');
        incidentProgressDialogPage.setProgressNumberInput('5');
        expect(incidentProgressDialogPage.getProgressNumberInput()).toMatch('5');
        incidentProgressDialogPage.setUpdatedByInput('updatedBy');
        expect(incidentProgressDialogPage.getUpdatedByInput()).toMatch('updatedBy');
        incidentProgressDialogPage.setDateUpdatedInput(12310020012301);
        expect(incidentProgressDialogPage.getDateUpdatedInput()).toMatch('2001-12-31T02:30');
        incidentProgressDialogPage.updatedPrioritySelectLastOption();
        incidentProgressDialogPage.setProgressDescriptionInput('progressDescription');
        expect(incidentProgressDialogPage.getProgressDescriptionInput()).toMatch('progressDescription');
        incidentProgressDialogPage.setLoanEquipmentInput('loanEquipment');
        expect(incidentProgressDialogPage.getLoanEquipmentInput()).toMatch('loanEquipment');
        incidentProgressDialogPage.save();
        expect(incidentProgressDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class IncidentProgressComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-incident-progress-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class IncidentProgressDialogPage {
    modalTitle = element(by.css('h4#myIncidentProgressLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    incidentNumberInput = element(by.css('input#field_incidentNumber'));
    progressNumberInput = element(by.css('input#field_progressNumber'));
    updatedByInput = element(by.css('input#field_updatedBy'));
    dateUpdatedInput = element(by.css('input#field_dateUpdated'));
    updatedPrioritySelect = element(by.css('select#field_updatedPriority'));
    progressDescriptionInput = element(by.css('input#field_progressDescription'));
    loanEquipmentInput = element(by.css('input#field_loanEquipment'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIncidentNumberInput = function (incidentNumber) {
        this.incidentNumberInput.sendKeys(incidentNumber);
    }

    getIncidentNumberInput = function () {
        return this.incidentNumberInput.getAttribute('value');
    }

    setProgressNumberInput = function (progressNumber) {
        this.progressNumberInput.sendKeys(progressNumber);
    }

    getProgressNumberInput = function () {
        return this.progressNumberInput.getAttribute('value');
    }

    setUpdatedByInput = function (updatedBy) {
        this.updatedByInput.sendKeys(updatedBy);
    }

    getUpdatedByInput = function () {
        return this.updatedByInput.getAttribute('value');
    }

    setDateUpdatedInput = function (dateUpdated) {
        this.dateUpdatedInput.sendKeys(dateUpdated);
    }

    getDateUpdatedInput = function () {
        return this.dateUpdatedInput.getAttribute('value');
    }

    setUpdatedPrioritySelect = function (updatedPriority) {
        this.updatedPrioritySelect.sendKeys(updatedPriority);
    }

    getUpdatedPrioritySelect = function () {
        return this.updatedPrioritySelect.element(by.css('option:checked')).getText();
    }

    updatedPrioritySelectLastOption = function () {
        this.updatedPrioritySelect.all(by.tagName('option')).last().click();
    }
    setProgressDescriptionInput = function (progressDescription) {
        this.progressDescriptionInput.sendKeys(progressDescription);
    }

    getProgressDescriptionInput = function () {
        return this.progressDescriptionInput.getAttribute('value');
    }

    setLoanEquipmentInput = function (loanEquipment) {
        this.loanEquipmentInput.sendKeys(loanEquipment);
    }

    getLoanEquipmentInput = function () {
        return this.loanEquipmentInput.getAttribute('value');
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
