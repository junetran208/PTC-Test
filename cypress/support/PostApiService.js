
export class PostApiService {
    constructor() {
      this.baseApiUrl = "https://reqres.in/api";
      this.authToken = null;
    }
  
  authenticateAndStoreToken(email, password) {
      return cy.request({
        method: 'POST',
        url: `${this.baseApiUrl}/login`,
        body: {
          email: email,
          password: password,
        },
      }).then((response) => {
        if (response.status === 200) {
          // Store the token in the class instance variable
          this.authToken = response.body.token;
        } else {
          // Handle authentication failure
          throw new Error('Authentication failed');
        }
      });
    }
   getStoredToken() {
      return this.authToken;
    }
  
  Login(email, password, endpoint, param = '') {
    const apiUrl = `${this.baseApiUrl}/${endpoint}${param}`;

    return cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        email: email,
        password: password,
      },
    }).then((response) => {
      if (response.status === 200) {
        return response;
      }
    });
  }
  CreateUser(email, password, authToken, endpoint) {
    const apiUrl = `${this.baseApiUrl}/${endpoint}`;
    return cy
      .request({
        method: 'POST',
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          return response; 
        } else {
          throw new Error('User creation failed');
        }
      });
  }

  
}
 

  