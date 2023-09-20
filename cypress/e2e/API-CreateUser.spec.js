import { PostApiService } from '../support/PostApiService';
import ApiService from "../support/GetApiService";

describe("Validate Create User API", () => {
  const loginService = new PostApiService();
  const createUserAPI = new PostApiService();
  //const getUserService = new GetApiService();
  let authToken; 

  beforeEach(() => {
    cy.log('Authenticating...');
    loginService.authenticateAndStoreToken('eve.holt@reqres.in', 'cityslicka');
    cy.wait(1000); 
    authToken = loginService.getStoredToken();
  });

  it('TC1: Verify that it is able to create a new user successfully with valid input data', () => {
    const userData = {
      email: "dungtest2@reqres.in",
      password: "password123",
    };
    const endpoint = 'users';
    createUserAPI.CreateUser(userData.email, userData.password, authToken, endpoint)
    .then((response) => {
      cy.log('Response:', response);

      expect(response.status).to.equal(201);
      expect(response.body.email).to.equal(userData.email);
    });
  });

  it('TC2: Verify error when creating a user with a duplicate email', () => {
    ApiService.getUsers('users', authToken, 'page=1')
      .then((response) => {
        const firstUserEmail = response.body.data[0].email;
        createUserAPI.CreateUser(firstUserEmail, 'password123', authToken, 'users')
          .then((response) => {
            expect(response.status).to.equal(400); 
            expect(response.body).to.have.property('error', 'Email already exists');
          });
      });
  });
  it('TC3: Verify error when creating a user without email and password', () => {
       const endpoint = 'users';
    createUserAPI.CreateUser( authToken, endpoint)
    .then((response) => {
      cy.log('Response:', response);

      expect(response.status).to.equal(400);
      expect(response.body.error).to.include('assign user and password');
    });
  });

});
