const express = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const path = require("path");
const pipedrive = require("pipedrive");
require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

const { HOST, CLIENT_ID, CLIENT_SECRET } = process.env;

const PORT = 1800;

const apiClient = new pipedrive.ApiClient();

let oauth2 = apiClient.authentications.oauth2;
oauth2.clientId = CLIENT_ID; // OAuth 2 Client ID
oauth2.clientSecret = CLIENT_SECRET; // OAuth 2 Client Secret
oauth2.redirectUri = HOST; // OAuth 2 Redirection endpoint or Callback Uri

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", async (req, res) => {
  console.log("start of / route");
  if (
    req.session.accessToken !== null &&
    req.session.accessToken !== undefined
  ) {
    // token is already set in the session
    // now make API calls as required
    // client will automatically refresh the token when it expires and call the token update callback
    // const api = new pipedrive.DealsApi(apiClient);
    // const deals = await api.getDeals();

    // res.send(deals);
    res.sendFile(path.join(path.join(__dirname, "./build"), "index.html"));
  } else {
    const authUrl = apiClient.buildAuthorizationUrl();

    res.redirect(authUrl);
  }
});

app.get("/callback", (req, res) => {
  const authCode = req.query.code;
  const promise = apiClient.authorize(authCode);

  promise.then(
    () => {
      req.session.accessToken = apiClient.authentications.oauth2.accessToken;
      res.redirect("/");
    },
    (exception) => {
      // error occurred, exception will be of type src/exceptions/OAuthProviderException
    }
  );
});
