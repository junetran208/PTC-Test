 
class DeleteApiService {
    constructor() {
      this.baseApiUrl = "https://reqres.in/api";
    }
  
    deleteUserById(id, authToken) {
      const apiUrl = `${this.baseApiUrl}/users/${id}`;
      return cy.request({
        method: "DELETE",
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }
  }
  
  export default new DeleteApiService();
  