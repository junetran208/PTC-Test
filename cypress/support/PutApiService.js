export class PutApiService {
    constructor() {
      this.baseApiUrl = "https://reqres.in/api";
    }
  
    updateUserById(id, email, password, authToken) {
      const apiUrl = `${this.baseApiUrl}/users/${id}`;
      return cy.request({
        method: "PUT",
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: {
          email: email,
          password: password,
        },
      });
    }
  }
  
  export default new PutApiService();
  
     