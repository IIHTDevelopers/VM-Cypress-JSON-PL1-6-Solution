class ProfilePage {

  elements = {
    // Visiting My Info Tab
    myInfoTab: () => cy.contains('span.oxd-main-menu-item--name', 'My Info'),

    // Test Case 9: Verify My info Download Functionality
    profileDownloadButton: () => cy.get('i.oxd-icon.bi-download').should('be.visible').eq(0),

    // Test Case 10
    firstName: () => cy.get('input[name="firstName"]').eq(0),
    middleName: () => cy.get('input[name="middleName"]'),
    lastName: () => cy.get('input[name="lastName"]')

  };

  // Test Case 9 
  myInfoPageDownloadFunctionality() {
    // Navigate to My Info tab
    this.elements.myInfoTab().click();

    cy.get('div.oxd-table-cell.oxd-padding-cell').eq(1)
    .first()
    .find('div')
    .invoke('text')
    .as('downloadedFileName');

    this.elements.profileDownloadButton().click();

  }
 
  // Test Case 10
  userProfileUpdateFunction() {
    // Navigate to My Info
    this.elements.myInfoTab().click();

    // Taking Data from Json File
    cy.fixture('UserDetailForm').then((data) => {
      
      this.elements.firstName()
        .clear()
        .type(data.firstName);

      this.elements.middleName()
        .clear()
        .type(data.middleName);

      this.elements.lastName()
        .clear()
        .type(data.lastName);

      cy.get('button[type="submit"]').eq(0).click(); // Click Save
    });
}

}

export default ProfilePage;
