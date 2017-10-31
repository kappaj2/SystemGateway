import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Member e2e test', () => {

    let navBarPage: NavBarPage;
    let memberDialogPage: MemberDialogPage;
    let memberComponentsPage: MemberComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Members', () => {
        navBarPage.goToEntity('member-my-suffix');
        memberComponentsPage = new MemberComponentsPage();
        expect(memberComponentsPage.getTitle()).toMatch(/systemGatewayApp.member.home.title/);

    });

    it('should load create Member dialog', () => {
        memberComponentsPage.clickOnCreateButton();
        memberDialogPage = new MemberDialogPage();
        expect(memberDialogPage.getModalTitle()).toMatch(/systemGatewayApp.member.home.createOrEditLabel/);
        memberDialogPage.close();
    });

    it('should create and save Members', () => {
        memberComponentsPage.clickOnCreateButton();
        memberDialogPage.setMemberKeyInput('memberKey');
        expect(memberDialogPage.getMemberKeyInput()).toMatch('memberKey');
        memberDialogPage.setMemberNameInput('memberName');
        expect(memberDialogPage.getMemberNameInput()).toMatch('memberName');
        memberDialogPage.setMemberSurnameInput('memberSurname');
        expect(memberDialogPage.getMemberSurnameInput()).toMatch('memberSurname');
        memberDialogPage.setDateCreatedInput(12310020012301);
        expect(memberDialogPage.getDateCreatedInput()).toMatch('2001-12-31T02:30');
        memberDialogPage.setDateModifiedInput(12310020012301);
        expect(memberDialogPage.getDateModifiedInput()).toMatch('2001-12-31T02:30');
        memberDialogPage.setUpdatedByInput('updatedBy');
        expect(memberDialogPage.getUpdatedByInput()).toMatch('updatedBy');
        memberDialogPage.save();
        expect(memberDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MemberComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-member-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MemberDialogPage {
    modalTitle = element(by.css('h4#myMemberLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    memberKeyInput = element(by.css('input#field_memberKey'));
    memberNameInput = element(by.css('input#field_memberName'));
    memberSurnameInput = element(by.css('input#field_memberSurname'));
    dateCreatedInput = element(by.css('input#field_dateCreated'));
    dateModifiedInput = element(by.css('input#field_dateModified'));
    updatedByInput = element(by.css('input#field_updatedBy'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setMemberKeyInput = function (memberKey) {
        this.memberKeyInput.sendKeys(memberKey);
    }

    getMemberKeyInput = function () {
        return this.memberKeyInput.getAttribute('value');
    }

    setMemberNameInput = function (memberName) {
        this.memberNameInput.sendKeys(memberName);
    }

    getMemberNameInput = function () {
        return this.memberNameInput.getAttribute('value');
    }

    setMemberSurnameInput = function (memberSurname) {
        this.memberSurnameInput.sendKeys(memberSurname);
    }

    getMemberSurnameInput = function () {
        return this.memberSurnameInput.getAttribute('value');
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
