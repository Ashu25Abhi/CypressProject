describe("Upload a File SUITE", () => {
  it("XHR Way", () => {
    function form_request(method, url, formData, done) {
      const Base64StringOfUserColonPassword = "YWRtaW46YWRtaW4 =";
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.setRequestHeader(
        "Authorization",
        // admin:admin
        "Basic " + Base64StringOfUserColonPassword
      );

      // onload determines that the request has been successfull
      xhr.onload = function () {
        done(xhr);
      };

      // onerror determines that the request has been failed
      xhr.onerror = function () {
        done(xhr);
      };

      xhr.send(formData);
    }

    const fileName = "yey.jpg";
    const method = "POST";
    const url = "http://localhost:5002/api/upload";
    const fileType = "image/jpg"; //mime type of the file

    cy.fixture(fileName, "binary")
      .then((txtBin) => Cypress.Blob.binaryStringToBlob(txtBin))
      .then((blob) => {
        const formData = new FormData();
        formData.append("file", blob, fileName);
        form_request(method, url, formData, function (response) {
          expect(response.status).to.eq(201);
          expect(JSON.parse(response.response).success).to.eq(true);
          expect(JSON.parse(response.response).message).to.eq(
            "File uploaded successfully!"
          );
        });
      });
  });
});
