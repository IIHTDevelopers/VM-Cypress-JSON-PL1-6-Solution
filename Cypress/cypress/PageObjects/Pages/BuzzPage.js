class BuzzPage{
    elements = {
        buzzTab: () => cy.contains('span.oxd-main-menu-item--name', 'Buzz'),

        // Test Case 1: Verify "Delete Post" Functionality
        moreOptionsButton: () => cy.get('i.oxd-icon.bi-three-dots').parents('button'),
        deletePostOption: () => cy.contains('li.orangehrm-buzz-post-header-config-item p', 'Delete Post'),
        confirmDeleteBtn: () => cy.get('.oxd-button--label-danger').contains('Yes, Delete'),
    }

    deletePostCheck() {
        // Navigate to Buzz Page
        this.elements.buzzTab().click();
        
        cy.wait(2000);  
        // Click on MoreOptions of the first post
        this.elements.moreOptionsButton().first().click();
        // Click on the first post's delete button
        this.elements.deletePostOption().click();
        // Confirm deletion
        this.elements.confirmDeleteBtn().click();
        
        
        // Verify deletion success message
        cy.get('.oxd-toast-content-text').should('contain', 'Successfully Deleted');
    }





}

export default BuzzPage;