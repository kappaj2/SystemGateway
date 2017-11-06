import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Equipment e2e test', () => {

    let navBarPage: NavBarPage;
    let equipmentDialogPage: EquipmentDialogPage;
    let equipmentComponentsPage: EquipmentComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Equipment', () => {
        navBarPage.goToEntity('equipment-my-suffix');
        equipmentComponentsPage = new EquipmentComponentsPage();
        expect(equipmentComponentsPage.getTitle()).toMatch(/systemGatewayApp.equipment.home.title/);

    });

    it('should load create Equipment dialog', () => {
        equipmentComponentsPage.clickOnCreateButton();
        equipmentDialogPage = new EquipmentDialogPage();
        expect(equipmentDialogPage.getModalTitle()).toMatch(/systemGatewayApp.equipment.home.createOrEditLabel/);
        equipmentDialogPage.close();
    });

    it('should create and save Equipment', () => {
        equipmentComponentsPage.clickOnCreateButton();
        equipmentDialogPage.setEquipmentIdInput('equipmentId');
        expect(equipmentDialogPage.getEquipmentIdInput()).toMatch('equipmentId');
        equipmentDialogPage.setEquipmentNameInput('equipmentName');
        expect(equipmentDialogPage.getEquipmentNameInput()).toMatch('equipmentName');
        equipmentDialogPage.setDateLoadedOnSystemInput(12310020012301);
        expect(equipmentDialogPage.getDateLoadedOnSystemInput()).toMatch('2001-12-31T02:30');
        equipmentDialogPage.setUploadedByInput('uploadedBy');
        expect(equipmentDialogPage.getUploadedByInput()).toMatch('uploadedBy');
        equipmentDialogPage.currentStatusSelectLastOption();
        equipmentDialogPage.setDateCreatedInput(12310020012301);
        expect(equipmentDialogPage.getDateCreatedInput()).toMatch('2001-12-31T02:30');
        equipmentDialogPage.setDateModifiedInput(12310020012301);
        expect(equipmentDialogPage.getDateModifiedInput()).toMatch('2001-12-31T02:30');
        equipmentDialogPage.setUpdatedByInput('updatedBy');
        expect(equipmentDialogPage.getUpdatedByInput()).toMatch('updatedBy');
        equipmentDialogPage.save();
        expect(equipmentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EquipmentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-equipment-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EquipmentDialogPage {
    modalTitle = element(by.css('h4#myEquipmentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    equipmentIdInput = element(by.css('input#field_equipmentId'));
    equipmentNameInput = element(by.css('input#field_equipmentName'));
    dateLoadedOnSystemInput = element(by.css('input#field_dateLoadedOnSystem'));
    uploadedByInput = element(by.css('input#field_uploadedBy'));
    currentStatusSelect = element(by.css('select#field_currentStatus'));
    dateCreatedInput = element(by.css('input#field_dateCreated'));
    dateModifiedInput = element(by.css('input#field_dateModified'));
    updatedByInput = element(by.css('input#field_updatedBy'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setEquipmentIdInput = function (equipmentId) {
        this.equipmentIdInput.sendKeys(equipmentId);
    }

    getEquipmentIdInput = function () {
        return this.equipmentIdInput.getAttribute('value');
    }

    setEquipmentNameInput = function (equipmentName) {
        this.equipmentNameInput.sendKeys(equipmentName);
    }

    getEquipmentNameInput = function () {
        return this.equipmentNameInput.getAttribute('value');
    }

    setDateLoadedOnSystemInput = function (dateLoadedOnSystem) {
        this.dateLoadedOnSystemInput.sendKeys(dateLoadedOnSystem);
    }

    getDateLoadedOnSystemInput = function () {
        return this.dateLoadedOnSystemInput.getAttribute('value');
    }

    setUploadedByInput = function (uploadedBy) {
        this.uploadedByInput.sendKeys(uploadedBy);
    }

    getUploadedByInput = function () {
        return this.uploadedByInput.getAttribute('value');
    }

    setCurrentStatusSelect = function (currentStatus) {
        this.currentStatusSelect.sendKeys(currentStatus);
    }

    getCurrentStatusSelect = function () {
        return this.currentStatusSelect.element(by.css('option:checked')).getText();
    }

    currentStatusSelectLastOption = function () {
        this.currentStatusSelect.all(by.tagName('option')).last().click();
    }
    setDateCreatedInput = function (dateCreated) {
        this.dateCreatedInput.sendKeys(dateCreated);
    }

    getDateCreatedInput = function () {
        return this.dateCreatedInput.getAttribute('value');
    }

    setDateModifiedInput = function (dateModified) {
        this.dateModifiedInput.sendKeys(dateModified);
    }

    getDateModifiedInput = function () {
        return this.dateModifiedInput.getAttribute('value');
    }

    setUpdatedByInput = function (updatedBy) {
        this.updatedByInput.sendKeys(updatedBy);
    }

    getUpdatedByInput = function () {
        return this.updatedByInput.getAttribute('value');
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
