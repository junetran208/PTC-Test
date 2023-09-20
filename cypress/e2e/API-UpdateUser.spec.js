import GetApiService from "../support/GetApiService";
import { PostApiService } from '../support/PostApiService';
import { PutApiService } from '../support/PutApiService';

describe("Validate updating User by Email and Password", () => {
  const createUserService = new PostApiService();
  const updateUserService = new PutApiService();
  let authToken;

  beforeEach(() => {
    cy.log('Authenticating...');
    createUserService.authenticateAndStoreToken('eve.holt@reqres.in', 'cityslicka');
    cy.wait(1000);
    authToken = createUserService.getStoredToken();
  });

  it('TC1: Verify that a user can be updated by email and password sucessfully', () => {
    GetApiService.getUsers('users', authToken, 'page=1')
      .then((response) => {
        const firstUserId = response.body.data[0].id;
        const updatedEmail = 'updated-email@reqres.in';
        const updatedPassword = 'new-password123';

        updateUserService.updateUserById(firstUserId, updatedEmail, updatedPassword, authToken)
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.email).to.equal(updatedEmail);
            
          });
      });
  });

  it('TC2: Verify an error shows when updating the user which has duplicate with another existing one', () => {
    let firstUserId;
    let secondUserEmail;

    GetApiService.getUsers('users', authToken, 'page=1').then((response) => {
      firstUserId = response.body.data[0].id;
      
      // Step 2: Get the second user's email by their ID
      GetApiService.getUserById('users', authToken, 2).then((response) => {
        secondUserEmail = response.body.data.email;
        
        // Step 3: Update the first user's email and password with the second user's email and a new password
        updateUserService.updateUserById(firstUserId, secondUserEmail, 'newPassword', authToken).then((response) => {
          expect(response.status).to.equal(200);
          //expect(response.body.email).to.equal(secondUserEmail); 
          expect(response.body.error).to.include('Duplicate email');
        });
      });
    });
  });
  it('TC3: Verify an error shows when giving a none existing userId on the request', () => {
       updateUserService.updateUserById("abcaaaaa", "test@test.com", 'newPassword', authToken).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.error).to.include('Invalid');

        });
      });
    
  

});
