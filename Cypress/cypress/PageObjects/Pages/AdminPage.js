class AdminPage {


  elements = {
    adminTab: () => cy.contains('span.oxd-main-menu-item--name', 'Admin'),

    // Test Case 5 & 6
    moreButton: () => cy.get('.oxd-topbar-body-nav-tab-item').contains('More'),
    corporateBrandingLink: () => cy.get('ul.oxd-dropdown-menu').find('a.oxd-topbar-body-nav-tab-link.--more').contains('Corporate Branding'),
    primaryColourTab: () => cy.get('label.oxd-label.oxd-input-field-required').should('contain.text', 'Primary Color'),
    publishButton: () => cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary').contains('Publish'),
    colourPicker: () => cy.get('div.oxd-color-input-preview').eq(0).should('be.visible'),

    // Test Case 7
    configurationLink: () => cy.get('ul.oxd-dropdown-menu').find('a.oxd-topbar-body-nav-tab-link.--more').contains('Configuration'),
    languageSaveButton: () => cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').contains('Save'),
    
  }


  // Test Case 5
  changePrimaryColour(primaryColour) {

    this.elements.adminTab().should('be.visible').click();
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain.text', 'Admin');
    this.elements.moreButton().should('be.visible').click();
    cy.wait(1000); // Wait for dropdown to appear
    this.elements.corporateBrandingLink().should('be.visible').click();
    cy.wait(1000)
    this.elements.primaryColourTab().should('be.visible');
    // Click on Primary Colour input
    this.elements.colourPicker().click();

    // Clear the input and type the new colour
    cy.get('input.oxd-input.oxd-input--active')
      .eq(1)
      .should('be.visible')
      .clear()
      .type(primaryColour, { delay: 100, force: true });

    // Click on Publish button
    this.elements.publishButton().should('be.visible').click();

  }

  // Test Case 6
  uploadImageGt1Mb(imageFile) {
    // Navigate to Admin Page
    this.elements.adminTab().should('be.visible').click();
    // Navigate to More button
    this.elements.moreButton().should('be.visible').click();
    // Click on Corporate Branding link
    this.elements.corporateBrandingLink().should('be.visible').click();

    // Click on the image upload area
    cy.get('div.oxd-file-button').eq(0).should('be.visible').click();
    // Upload the image file  
    cy.get('input[type="file"]').eq(0)
    .should('exist')
    .selectFile(`cypress/fixtures/${imageFile}`, { force: true });

  }

  // Test Case 7
  languageChangeFunctionality() {

    // Navigate to Admin Page
    this.elements.adminTab().should('be.visible').click();
    // Navigate to More button
    this.elements.moreButton().should('be.visible').click();
    // Click on Configuration link
    this.elements.configurationLink().should('be.visible').click();
    cy.get('.oxd-topbar-body-nav-tab-accordian')
      .should('be.visible')
      .contains('Localization')
      .click();

    // Click on Language dropdown
    cy.get('div.oxd-select-text').eq(0).click();

    // Select Chinese from the dropdown
    cy.get('.oxd-select-dropdown')
      .should('be.visible')
      .contains('Chinese')
      .click();

    this.elements.languageSaveButton().should('be.visible').click();

  }


  
 
}

export default AdminPage;
