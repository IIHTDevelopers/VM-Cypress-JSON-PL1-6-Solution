import LoginPage from '../PageObjects/Pages/LoginProfilePage';
import ProfilePage from '../PageObjects/Pages/ProfilePage';
import HomePage from '../PageObjects/Pages/HomePage';
import AdminPage from '../PageObjects/Pages/AdminPage';
import LeavePage from '../PageObjects/Pages/LeavesPage';
import BuzzPage from '../PageObjects/Pages/BuzzPage';
import PimPages from '../PageObjects/Pages/PimPage';


describe('Automation Suite for Yaksha Application', () => {
  const loginPage = new LoginPage();
  const profilePage = new ProfilePage();
  const homePage = new HomePage();
  const adminPage = new AdminPage();
  const leavePage = new LeavePage();
  const buzzPage = new BuzzPage();
  const pimPage = new PimPages();


  beforeEach(() => {

    // Login for each Test Case
    loginPage.performLogin(); // Common Step: Login
    cy.wait(2000);

  });


  // Test Case 1
  it('Test Case-1: Verify "Delete Post" Functionality', () => {
    cy.wrap(null)
      .then(() => {
        // Navigate to Profile Page
        buzzPage.deletePostCheck();
      })
      .then(() => {
        // Verify the post is deleted
        verifyBuzzPostDelete(); 
      });
 
  });


  // Test Case 2
  it('Test Case-2: Verify "Get" help button is functional', () => {
    cy.wrap(null)
      .then(() => {
        // Navigate to Leaves Page , Creating holiday
        homePage.tooltipFunctional()
      })
      .then(() => {
        // Verify Tolltip Functioning
        verifyHelpButtonOpensNewTab()
      });

  });


  // Test Case 3
  it('Test Case-3: Verify List of Reports ', () => {
    cy.wrap(null).then(() => {
      // Navigate to PIM Page
      pimPage.employeeListCheck();    

    }).then(() => {
      // Verify Employee List Presense
      verifyEmpListPresense(); 
    });

  });


  // Test Case 4
  it('Test Case-4: Verify Employee List Search functionality', () => {
    // Step 1: Extract ID and store
    let foundID = null;

    // Test Case 4 Helper Function
    getFirstNumericEmployeeId().then((id) => {
      foundID = id; // save in test-scope variable

      // Step 2: Use the same ID in the search method / Comment This
      pimPage.searchEmployeeById(foundID);
    });

    // Step 3: Verify result with same ID
    cy.then(() => {
      verifyEmpListSearch(foundID);
    });

  });

  
  
  it('Test Case-5: Verify Primary Colour of corporate branding could be changed', () => {

    let primaryColour = '#1231df'; // Example colour
    cy.wrap(null).then(() => {

      // Changing Primary Colour
      adminPage.changePrimaryColour(primaryColour); 
            
      }).then(() => {
        // Verify the Change Color functionality works
        verifyColourChanged(primaryColour);  
      });

   
  });


  // Test Case 6
  it('Test Case-6: Verify Client Logo could not be uploaded above 1 mb', () => {

    cy.wrap(null).then(() => {
        // Changing Image Greter than 1 MB
        adminPage.uploadImageGt1Mb('ImageGreaterThan1Mb.jpg');
      })
      .then(() => {
        // Verify the error message appears for incorrect dimension
        verifyIncorrecrDimError();
      });

  });

  // Test Case 7
  it('Test Case-7: Verify Language change Functionality  ', () => {
    //Go to Buzz tab

    cy.wrap(null)
      .then(() => {
        // Performing Language Change Functionality
        adminPage.languageChangeFunctionality();

      })
      .then(() => {
        // Verify the Language Change functionality works & Change Language to English Again for next Test case works fine.
        verifyLanguageChangeFunctionality();
      });
    
  });


  // Test Case 8
  it('Test Case-8 : Verify Required Field Error in Leaves Tab displays when required field is empty', () => {
    cy.wrap(null).then(() => {

      // Navigate to Leaves Tab and Assign Leave
      leavePage.leaveAssignEmptyValueError();

    }).then(() => {
      // Verify the Required Field Error in Leaves Tab displays when required field is empty
      varifyAssignEmptyFieldError();
    });
    
  });

  // Test Case 9
  it('Test Case-9: Verify My info Download Functionality ', () => {
    cy.wrap(null).then(() => {
      // Check Profile My Info Functionality is working
      profilePage.myInfoPageDownloadFunctionality();

    }).then(() => {

      // Verify the Download Functionality works
      verifyMyInfoPageDownloadFunctionality();
      
    });

  });


  // Test Case 10
  it('Test Case-10: Verify User details could be Updated ', () => {
    cy.wrap(null).then(() => {
      // Visit theMy Info and Updating user details
      profilePage.userProfileUpdateFunction();
      
    }).then(() => {
      // Verify the User Details 
      verifyUserProfileDetail();
    });

    // Logging
    cy.log('User details is Updated Succesfully');
  });

});



// ---------------------- Helper Functions ----------------------

// Test Case 1: Verify Post Deletion
function verifyBuzzPostDelete() {
    // Verify deletion success message
    cy.get('.oxd-toast-content-text').should('contain', 'Successfully Deleted');
};


// Test Case 2: Verify Tolltip Functionality
function verifyHelpButtonOpensNewTab() {
  // Assert new tab (window.open) is called
  cy.get('@windowOpen').should('be.called'); 
}


// Test Case 3: Verify Employee List Presence
function verifyEmpListPresense() {
  cy.get('.oxd-table-body .oxd-table-row')
    .should('exist')
    .and('have.length.greaterThan', 0);
}


// Test Case 4: Verify Employee List Search Functionality
function verifyEmpListSearch(empId) {
  cy.get('.oxd-table-body .oxd-table-row').should('have.length', 1);
  cy.get('.oxd-table-body .oxd-table-row')
    .first()
    .find('div.oxd-table-cell')
    .contains(empId)
    .should('be.visible');
}



// Test Case 5: Verify User Deletion
function verifyColourChanged(expectedHex) {
  cy.get('div.oxd-color-input-preview').eq(0)
    .should('exist');

  cy.wait(300); // Let popup settle

  cy.get('div.oxd-color-input-preview').eq(0)
    .click({ force: true });

  cy.get('input.oxd-input.oxd-input--active')
  .eq(1)
    .invoke('val')
    .then((actualHex) => {
      expect(actualHex.toUpperCase()).to.eq(expectedHex.toUpperCase());
    });

  cy.get('body').type('{esc}');
}



// Test Case 6 : Verify Image Incorrect Dimension Error
function verifyIncorrecrDimError() {
  cy.wait(1000); // Wait for error message to appear
  cy.get('span.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
    .should('be.visible')
    .should('contain.text', 'Incorrect Dimensions');
}

// Test Case 7: Verify User Edit Form Appears
function verifyLanguageChangeFunctionality() {
  cy.get('div.oxd-select-text').contains('Chinese')
    .should('be.visible')

  cy.wait(2000);
  // Changes Language again to English
  cy.get('div.oxd-select-text').eq(0).click();
  cy.get('.oxd-select-dropdown')
      .should('be.visible')
      .contains('English')
      .click();

  cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space')
      // .contains('Save')
      .should('be.visible')
      .click()
    
}

// Test Case 8: Verify Required Field Error in Leaves Tab
function varifyAssignEmptyFieldError() {
    cy.get('span.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
      .should('be.visible')
      .and('contain.text', 'Required');
}

// Test Case 9: Verify My Info Page Download Function Is working
function verifyMyInfoPageDownloadFunctionality() {
  cy.wait(2000); // Give time for file to download

  cy.get('@downloadedFileName').then((fileName) => {
    const trimmedFileName = fileName.trim(); // Clean up any trailing whitespace
    cy.log(`📁 Checking if downloaded file "${trimmedFileName}" exists in downloads`);

    cy.task('isFileDownloaded', trimmedFileName).then((exists) => {
      expect(exists, `Downloaded file "${trimmedFileName}" should exist`).to.be.true;
    });
  });
}


 // Test Case 10 
function verifyUserProfileDetail() {
  
  // Verify that the user profile details have been updated correctly
  cy.fixture('UserDetailForm').then((data) => {
    // Verifu First Name is correct or not
    cy.get('input[name="firstName"]')
      .should('have.value', data.firstName);

    // Verify Middle Name is also Correct
    cy.get('input[name="middleName"]')
      .should('have.value', data.middleName);

    // Verify Last Name is Correct
    cy.get('input[name="lastName"]')
      .should('have.value', data.lastName);
  });
}


// Test Case 4 helper Fucntion
function getFirstNumericEmployeeId() {

    // Visiting Pim Tab
    cy.contains('span.oxd-main-menu-item--name', 'PIM').should('be.visible').click();
    cy.contains('Employee List').should('be.visible').click();

    return cy.get('.oxd-table-body .oxd-table-row')
        .find('div.oxd-table-cell').eq(1)
        .then(($cells) => {
        let foundID = null;

        $cells.each((i, el) => {
            const text = Cypress.$(el).text().trim();
            if (/^\d+$/.test(text)) {
            foundID = text;
            return false;
            }
        });

        expect(foundID).to.not.be.null;
        return foundID;
        });
    }
