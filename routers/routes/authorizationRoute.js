const express = require("express");
const authorizationRoute = express.Router();

const { getAuthorizations, createAuthorization, getAuthorizationUser } = require("../controllers/authorization");
const { authentication } = require("../middleware/authentication");

authorizationRoute.get("/authorizations", authentication, getAuthorizations);
authorizationRoute.get("/authorizations-user", authentication, getAuthorizationUser);
authorizationRoute.post("/authorizations", authentication, createAuthorization);


module.exports = authorizationRoute;
