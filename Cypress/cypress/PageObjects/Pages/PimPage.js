class PimPages{

    elements = {
        // Test Case 3
       pimTab: () => cy.contains('span.oxd-main-menu-item--name', 'PIM'),
       employeeListTab: () => cy.contains('Employee List')
    }

    // Test Case 3
    employeeListCheck() {
        // Navigate to PIM Page
        this.elements.pimTab().should('be.visible').click();
        // Click on Employee List Tab   
        this.elements.employeeListTab().should('be.visible').click();
    }
    
    // Test Case 4
    empListSearch() {
      // Navigate to PIM > Employee List
        this.elements.pimTab().should('be.visible').click();
        this.elements.employeeListTab().should('be.visible').click();

        //Extract a valid numeric employee ID
        return cy.get('.oxd-table-body .oxd-table-row')
            .find('div.oxd-table-cell')
            .then(($cells) => {
            let foundID = null;

            // Loop to find numeric ID
            $cells.each((i, el) => {
                const text = Cypress.$(el).text().trim();
                if (/^\d+$/.test(text)) {
                foundID = text;
                return false; // exit loop
                }
            });

        // Validate we found an ID
        expect(foundID, 'Found numeric Employee ID').to.not.be.null;

        return cy.wrap(null).then(() => {
            // Search using the found ID
            cy.contains('label', 'Employee Id')
            .parents('.oxd-input-group') // use correct wrapper if needed
            .find('input.oxd-input')
            .should('be.visible')
            .clear()
            .type(foundID);

            cy.get('button').contains('Search').click();

            return foundID;
        });
        });
    }
    // Test Case 4
    searchEmployeeById(empId) {
        // Type in the ID field
        cy.contains('label', 'Employee Id')
            .parents('.oxd-input-group') // adjust if needed
            .find('input.oxd-input')
            .should('be.visible')
            .clear()
            .type(empId);

        // Click Search
        cy.get('button').contains('Search').click();
    }



//-------------------------------- Helper Functions --------------------------------
    

}

export default PimPages;