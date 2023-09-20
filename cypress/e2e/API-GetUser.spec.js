import ApiService from "../support/GetApiService";
import {PostApiService} from '../support/PostApiService'; 

describe('Validate for GET User List API', () => {
const loginService = new PostApiService();
  let authToken; 
  beforeEach(() => {
    cy.log('Authenticating...');
   loginService.authenticateAndStoreToken('eve.holt@reqres.in', 'cityslicka');
    cy.wait(1000); 
    authToken = loginService.getStoredToken();
   
  });
  
  it('TC1: Verify that it should return the first page and and non-empty "data" if sending GET user request without param', () => {
    const endpoint = 'users';
    ApiService.getUsers(endpoint,authToken).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.page).to.equal(1);
      expect(response.body.data).to.be.an('array').and.not.to.be.empty;
    });
  });

 
 let TC2Data;
  before(() => {
  cy.fixture("GET Users-TC2.json").then((data) => {
    TC2Data = data;
  });
});
  it('TC2: Verify that it returns the correct page when giving a valid "page number" param', () => {
    const endpoint = 'users';
    TC2Data.forEach((entry) => {
      const queryParams = `page=${entry.page}`;
      ApiService.getUsers(endpoint, authToken, queryParams).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.page).to.equal(entry.page);
        expect(response.body.data).to.be.an('array').and.not.to.be.empty;
      });
    });
   });

   let TC3Data;
   before(() => {
   cy.fixture("GET Users -TC3.json").then((data) => {
    TC3Data = data;
   });
  });
  it('TC3: Verify that it returns the correct empty data when giving a non-existing "page number" param', () => {
    const endpoint = 'users';
    TC3Data.forEach((entry) => {
      const queryParams = `page=${entry.page}`;
      ApiService.getUsers(endpoint, authToken, queryParams).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.data).to.be.an('array').and.to.be.empty;
      });
    });
  }); 

  let TC4Data;
  before(() => {
  cy.fixture("GET Users-TC4.json").then((data) => {
    TC4Data = data;
  });
 });
 it('TC4: Verify that it returns the error if giving any charaters without number into "page" param', () => {
   const endpoint = 'users';
   TC4Data.forEach((entry) => {
     const queryParams = `page=${entry.page}`;
     ApiService.getUsers(endpoint, authToken, queryParams).then((response) => {
       expect(response.status).to.equal(200);
       expect(response.body).to.have.property('error', 'invalid data');
     });
   });
  });

});
