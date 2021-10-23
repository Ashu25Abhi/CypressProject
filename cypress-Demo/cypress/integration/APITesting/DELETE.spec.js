/// <reference types="@bahmutov/cy-api" />
describe("DELETE SUITE", () => {
  it.only("DELETE A MEMBER", () => {
    cy.request({
      url: "/api/members/4",
      method: "DELETE",
      auth: {
        username: "admin",
        password: "admin",
      },
      // don't fail the test case even if the status code is not equal to 400 or 300 series
      // failOnStatusCode: false,
    })
      .its("status")
      .should("eql", 200);
  });

  it("DELETE A MEMBER - CY API", () => {
    cy.api({
      url: "/api/members/4",
      method: "DELETE",
      auth: {
        username: "admin",
        password: "admin",
      },
    }).then((res) => {
      expect(res.body.msg).to.eql("Member with id 5 is deleted successfully");
    });
  });
});
