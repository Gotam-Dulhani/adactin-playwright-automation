import { test, expect } from '@playwright/test';
import apiData from '../testdata/apiData.json' with { type: 'json' };
import loginData from '../testdata/loginData.json' with { type: 'json' };
import { expectStatus, expectHeader, expectJsonSchema, timedRequest, expectResponseTime } from '../utilities/apiValidation.js';
import { logger } from '../utilities/logger.js';

const apiUser = loginData.validUsers[0];

test.beforeAll(async () => {
  logger.info('API test suite started');
});

test.afterAll(async () => {
  logger.info('API test suite finished');
});

test('Get user API Test', async ({ request }) => {
  const { response: loginResponse, durationMs: loginTime } = await timedRequest(() =>
    request.post(`${apiData.mockBaseUrl}${apiData.mock.loginPath}`, {
      data: { username: apiUser.username, password: apiUser.password },
    })
  );
  expectStatus(loginResponse, apiData.mock.expectedLoginStatus);
  expectHeader(loginResponse, 'content-type', 'application/json');
  expectResponseTime(loginTime, apiData.mock.maxResponseTimeMs);

  const token = (await loginResponse.json()).token;
  const { response: getResponse, durationMs: getTime } = await timedRequest(() =>
    request.get(`${apiData.mockBaseUrl}${apiData.mock.currentUserPath}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  expectStatus(getResponse, apiData.mock.expectedUserStatus);
  expectJsonSchema(await getResponse.json(), {
    id: 'number',
    username: 'string',
    email: 'string',
    roles: 'array',
  });
  expectHeader(getResponse, 'content-type', 'application/json');
  expectResponseTime(getTime, apiData.mock.maxResponseTimeMs);
});

test('Validate Book API Response', async ({ request }) => {
  const { response, durationMs } = await timedRequest(() =>
    request.get(`${apiData.demoqaBaseUrl}${apiData.demoqa.booksPath}`)
  );
  expectStatus(response, apiData.demoqa.expectedBooksStatus);
  expectHeader(response, 'content-type', 'application/json');
  expectResponseTime(durationMs, apiData.demoqa.maxResponseTimeMs);

  const body = await response.json();
  expectJsonSchema(body, { books: 'array' });
  expect(body.books.length).toBeGreaterThan(0);
  expect(body.books[0].title).toBe(apiData.demoqa.expectedBookTitle);
});

test('Create User API Test', async ({ request }) => {
  const { response, durationMs } = await timedRequest(() =>
    request.post(`${apiData.demoqaBaseUrl}${apiData.demoqa.createUserPath}`, {
      data: {
        userName: `${apiUser.username}${Date.now()}`,
        password: `${apiUser.password}${apiData.demoqa.passwordSuffix}`,
      },
    })
  );
  expectStatus(response, apiData.demoqa.expectedCreateStatus);
  expectHeader(response, 'content-type', 'application/json');
  expectResponseTime(durationMs, apiData.demoqa.maxResponseTimeMs);
  expectJsonSchema(await response.json(), {
    userID: 'string',
    username: 'string',
    books: 'array',
  });
});

test('Update User API', async ({ request }) => {
  const { response, durationMs } = await timedRequest(() =>
    request.put(`${apiData.demoqaBaseUrl}${apiData.demoqa.updateUserPath}`, {
      data: { userName: apiData.demoqa.updatedUserName },
    })
  );
  expectStatus(response, apiData.demoqa.expectedUpdateStatus);
  expectResponseTime(durationMs, apiData.demoqa.maxResponseTimeMs);
});

test('Delete User API', async ({ request }) => {
  const userName = `${apiUser.username}${Date.now()}`;
  const password = `${apiUser.password}${apiData.demoqa.passwordSuffix}`;

  const createResponse = await request.post(`${apiData.demoqaBaseUrl}${apiData.demoqa.createUserPath}`, {
    data: { userName, password },
  });
  expectStatus(createResponse, apiData.demoqa.expectedCreateStatus);
  const userID = (await createResponse.json()).userID;

  const tokenResponse = await request.post(`${apiData.demoqaBaseUrl}${apiData.demoqa.generateTokenPath}`, {
    data: { userName, password },
  });
  expectStatus(tokenResponse, apiData.demoqa.expectedTokenStatus);
  const token = (await tokenResponse.json()).token;

  const { response, durationMs } = await timedRequest(() =>
    request.delete(`${apiData.demoqaBaseUrl}${apiData.demoqa.createUserPath}/${userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  expectStatus(response, apiData.demoqa.expectedDeleteStatus);
  expectResponseTime(durationMs, apiData.demoqa.maxResponseTimeMs);
});
