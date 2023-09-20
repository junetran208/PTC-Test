import { PostApiService } from '../support/PostApiService';

describe("Validate Login API function", () => {
  const loginService = new PostApiService();

  it('TC1: verify that it should log successfully in with valid credentials', () => {
    const endpoint = 'login';

    loginService.Login('eve.holt@reqres.in', 'cityslicka', endpoint).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token', 'QpwL5tke4Pnpja7X4');
    });
  });
  it('TC2: Verify that an error is shown if login with invalid user name or password', () => {
    const endpoint = 'login';
    loginService.Login('invalid@reqres.in', 'invalidpwd', endpoint).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error', 'user not found');
    });
  });
  it('TC3: verify that it should return bad request with error if login with invalid url request', () => {
    const endpoint = 'login';
    loginService.Login('eve.holt@reqres.in', 'cityslicka', endpoint,"abc").then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error', 'invalid url');
    });
  });
  it('TC4: Verify that an error is shown if login with valid username but invalid password', () => {
    const endpoint = 'login';
    loginService.Login('eve.holt@reqres.in', 'invalid', endpoint).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error', 'invalid user name or password');
    });
  });

});

