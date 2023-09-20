import ApiService from "../support/GetApiService";
import { PostApiService } from '../support/PostApiService';
import DeleteApiService from "../support/DeleteApiService"; 

describe("Validate by E2E Flow", () => {
  const loginService = new PostApiService();
  const createUserAPI = new PostApiService();
 
  let authToken;
  let userIdToDelete;
  let createdUserId;

  beforeEach(() => {
    cy.log('Authenticating...');
    loginService.authenticateAndStoreToken('eve.holt@reqres.in', 'cityslicka');
    cy.wait(1000);
    authToken = loginService.getStoredToken();
  });

  it('Flow1:Create a user via Create API-> Get user id to check if the created user is stored -> Login with the user', () => {
    // Step 1: Create a user via Create API
    const userData = {
      email: "newuser@example.com",
      password: "password123",
    };

    createUserAPI.CreateUser(userData.email, userData.password, authToken, 'users')
      .then((createResponse) => {
        // Verify that the response indicates successful user creation (e.g., status code 201)
        expect(createResponse.status).to.equal(201);

        // Verify that the response body contains the ID of the created user
        expect(createResponse.body).to.have.property('id');
        createdUserId = createResponse.body.id;

        // Step 2: Use Get API by ID to check if the user is stored
        return ApiService.getUserById('users', authToken, createdUserId);
      })
      .then((getResponse) => {
        // Verify that the Get API response contains the created user's data
        expect(getResponse.status).to.equal(200);
        expect(getResponse.body.id).to.equal(createdUserId);

        // Step 3: Login with the created user's credentials
        const loginData = {
          email: userData.email,
          password: userData.password,
        };

        loginService.authenticateAndStoreToken(loginData.email, loginData.password)
          .then((loginResponse) => {
            // Verify that the login was successful (e.g., status code 200)
            expect(loginResponse.status).to.equal(200);

            // Additional assertions or actions can be added here
          });
      });
  });

  it('Flow2: Verify that the delete user is unable to seen when get by this UserId ', () => {
    // Get the user list
    ApiService.getUsers('users', authToken, 'page=1')
      .then((response) => {
        // Get the ID of the first user in the list
        userIdToDelete = response.body.data[0].id;

        // Use the DeleteApiService to delete the user by ID
        return DeleteApiService.deleteUserById(userIdToDelete, authToken);
      })
      .then((deleteResponse) => {
        // Verify that the deletion was successful (status code 204 for example)
        expect(deleteResponse.status).to.equal(204);

        // Attempt to retrieve the deleted user by ID
        ApiService.getUserById('users', authToken, userIdToDelete)
          .then((getResponse) => {
            // Verify that the response contains an empty 'data' property
            expect(getResponse.body.data).to.be.empty;
          });
      });
  });
});
