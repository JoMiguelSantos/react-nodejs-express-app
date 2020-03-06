const app = require("../app");
const request = require("supertest");

describe("bookmarks route", () => {
  it("accepts request and respondes with success status", done => {
    request(app)
      .get("/api/v1/bookmarks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).toStrictEqual(["status", "data"]);
        expect(res.body.status).toStrictEqual("success");
        done();
      });
  });

  it("should get a status 400 and message if bad add bookmark req", done => {
    const notRepoId = 123456;
    request(app)
      .post("/api/v1/bookmarks")
      .send({ notRepoId: notRepoId })
      .set("Accept", "text/html")
      .expect("Content-Type", /text/)
      .expect(400)
      .then(res => {
        expect(res.text).toStrictEqual(
          "You have not provided a repository ID, please provide a JSON object with the 'repoId' key and corresponding value"
        );
        done();
      });
  });

  it("should get a status 201 and data in body if good add bookmark req", done => {
    const repoId = 123456;
    request(app)
      .post("/api/v1/bookmarks")
      .send({ repoId: repoId })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(Object.keys(res.body)).toStrictEqual(["status", "data"]);
        expect(res.body).toStrictEqual({
          status: "success",
          data: {
            data: { repoId: repoId, isBookmarked: true }
          }
        });
        done();
      });
  });

  it("should get a status 400 and message if bad del bookmark req", done => {
    const notRepoId = 123456;
    request(app)
      .delete("/api/v1/bookmarks")
      .send({ notRepoId: notRepoId })
      .set("Accept", "text/html")
      .expect("Content-Type", /text/)
      .expect(400)
      .then(res => {
        expect(res.text).toStrictEqual(
          "You have not provided a repository ID, please provide a JSON object with the 'repoId' key and corresponding value"
        );
        done();
      });
  });

  it("should get a status 204 and no data in body if good del bookmark req", done => {
    const repoId = 123456;
    request(app)
      .delete("/api/v1/bookmarks")
      .send({ repoId: repoId })
      .expect(204)
      .then(res => {
        expect(res.body).toStrictEqual({});
        done();
      });
  });
});

describe("repos route", () => {
  it("accepts request and respondes with success status", done => {
    request(app)
      .get(
        "/api/v1/repos?name=react&description=redux&readme=dispatch&language=javascript&topic=state management"
      )
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).toStrictEqual(["status", "data"]);
        expect(res.body.status).toStrictEqual("success");
        done();
      });
  });

  it("should get a status 400 and message if bad add bookmark req", done => {
    request(app)
      .get("/api/v1/repos")
      .set("Accept", "text/html")
      .expect("Content-Type", /text/)
      .expect(400)
      .then(res => {
        expect(res.text).toStrictEqual(
          "You have not provided any search term, please visit the API documentation to know all allowed search terms and correct syntax"
        );
        done();
      });
  });

  it("should get a status 422 and message if bad add bookmark req", done => {
    request(app)
      .get(
        "/api/v1/repos?notname=react&notdescription=redux&notreadme=dispatch&notlanguage=javascript&nottopic=state management"
      )
      .set("Accept", "text/html")
      .expect("Content-Type", /text/)
      .expect(422)
      .then(res => {
        expect(res.text).toStrictEqual(
          "You have not provided any of the allowed search terms, please visit the API documentation to know all allowed search terms"
        );
        done();
      });
  });
});
