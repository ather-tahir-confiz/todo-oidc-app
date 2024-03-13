import Keycloak from "keycloak-js";

const keycloakConfig = {
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  url: process.env.REACT_APP_KEYCLOAK_URL,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  onLoad: "check-sso", // check-sso | login-required
  KeycloakResponseType: "code",
  scope: process.env.REACT_APP_KEYCLOAK_SCOPE,
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
