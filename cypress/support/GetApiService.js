// cypress/support/GetApiService.js

class GetApiService {
  constructor() {
    this.baseApiUrl = "https://reqres.in/api";
  }

  getUsers(endpoint,authToken,queryParams) {
   const apiUrl = `${this.baseApiUrl}/${endpoint}?${queryParams}`;
    return cy.request({
      method: "GET",
      url: apiUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
  getUserById(endpoint, authToken, userId) {
    const apiUrl = `${this.baseApiUrl}/${endpoint}/${userId}`;
    return cy.request({
      method: "GET",
      url: apiUrl,
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
}

export default new GetApiService();

  