
class HomePage {
  // Defining Elements
  elements = {
    // Test Case 2
    toolTipButton: () => cy.get('button[title="Help"]'),

  };

  
  // Test Case 2 
  tooltipFunctional() {
    // Visit the Home Page
    cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpen');
    });

    // Click the Help icon button
    this.elements.toolTipButton().should('be.visible').click({ force: true });
  }





}


export default HomePage;
