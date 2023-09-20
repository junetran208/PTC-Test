import ApiService from "../support/GetApiService";
import { PostApiService } from '../support/PostApiService';
import DeleteApiService from "../support/DeleteApiService"; 

describe("Validate deleting User API", () => {
  const loginService = new PostApiService();
  let authToken;
  let userIdToDelete;

  beforeEach(() => {
    cy.log('Authenticating...');
    loginService.authenticateAndStoreToken('eve.holt@reqres.in', 'cityslicka');
    cy.wait(1000);
    authToken = loginService.getStoredToken();
  });

  it('TC1:Verify return code =204 after delete a user', () => {
    // Get the user list
    ApiService.getUsers('users', authToken, 'page=1')
      .then((response) => {
        userIdToDelete = response.body.data[0].id;
        return DeleteApiService.deleteUserById(userIdToDelete, authToken);
      })
      .then((deleteResponse) => {
        expect(deleteResponse.status).to.equal(204);
     });
  });

  it('TC2:Verify should have error if request deleting  a non-existing userId', () => {
    return DeleteApiService.deleteUserById(1233445545, authToken)
      .then((response) => {
        expect(response.status).to.equal(404);    
        expect(response.body.error).to.include('Invalid request'); 

        });
    }); 
   it('TC3:Verify should have error if giving a specical chars as an Id in the request', () => {
     return DeleteApiService.deleteUserById("select* abc='", authToken)
         .then((response) => {
           expect(response.status).to.equal(404);    
           expect(response.body.error).to.include('Invalid request'); 
    
          });
       }); 
});
