const request = require("supertest")('http://localhost:4000');
require("babel-polyfill");
const app = require("../src/Components/App.js");

it ('should fetch a created user', async () => {
    const response = await request.post("/reviews").send({id: 9});
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("reviewerId");
    expect(response.body[0]).toHaveProperty("reviewerName");
    expect(response.statusCode).toBe(200);
});

it ('should fetch carousel routes as well', async () => {
  const response = await request.post("/reviews/carouselReviews").send({ids: [1, 2, 3]});
  expect(response.body.length).toBeGreaterThan(0);
  expect(response.body[0]).toHaveProperty("bookId");
  expect(response.body[0]).toHaveProperty("reviewerName");
  expect(response.statusCode).toBe(200);
})




