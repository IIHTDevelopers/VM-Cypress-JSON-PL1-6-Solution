class LeavesPage {
  elements = {
    // Define locators for elements on the Leaves page
    leaveTab: () => cy.contains('span.oxd-main-menu-item--name', 'Leave'),

    // Test Case 8
    moreButton: () => cy.get('.oxd-topbar-body-nav-tab-item').contains('More'),
    assignLeaveButton: () => cy.get('ul.oxd-dropdown-menu').find('a.oxd-topbar-body-nav-tab-link.--more').contains('Assign Leave'),
    assignSubmitButton: () => cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').contains('Assign'),

  };


  // Test Case 8: Verify Required Field Error in Leaves Tab displays when required field is empty
  leaveAssignEmptyValueError() {
    // Navigate to Leaves tab
    this.elements.leaveTab().click();
    // Click on More button
    this.elements.moreButton().click();
    // Click on Assign Leave button
    this.elements.assignLeaveButton().click();

    // Click on the Assign button without filling required fields
    this.elements.assignSubmitButton().click();
  }
}

export default LeavesPage;