class MyInfoPage {

    elements = {
        // Visiting My Info Tab
        myInfoTab: () => cy.contains('span.oxd-main-menu-item--name', 'My Info'),

    }


    myInfoFileDownload() {
        // Navigate to My Info tab
        this.elements.myInfoTab().click();

        // Click on the Download button
        cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary').contains('Download').click();

        // Assert that the file is downloaded successfully
        cy.get('.oxd-file-download-success').should('be.visible');
        
    }

}


export default MyInfoPage;