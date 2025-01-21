
import { Log, OidcClient } from "https://cdn.skypack.dev/oidc-client-ts";

Log.setLogger(console);
Log.setLevel(Log.INFO);

if (!window.appSettings.PROVIDER_ISSUER) {
    alert('Application settings are missing, Make sure you have from .env file');
}

const url = window.location.origin + "";
export const settings = {

    //TODO - Call making by the oidc-client-ts library giving CORS error
    //Workaround - Copy the contents for the issuer URL and paste it under metdata attribute;
    authority: window.appSettings.PROVIDER_ISSUER,
    metadata: { "issuer": window.appSettings.PROVIDER_ISSUER, "authorization_endpoint": `${window.appSettings.PROVIDER_ISSUER}/oauth2/auth`, "token_endpoint": `${window.appSettings.PROVIDER_ISSUER}/oauth2/token`, "jwks_uri": `${window.appSettings.PROVIDER_ISSUER}/.well-known/jwks.json`, "subject_types_supported": ["public"], "response_types_supported": ["code"], "claims_supported": ["sub"], "grant_types_supported": ["authorization_code", "refresh_token"], "response_modes_supported": ["query", "fragment"], "userinfo_endpoint": `${window.appSettings.PROVIDER_ISSUER}/userinfo`, "scopes_supported": ["offline_access", "offline", "openid"], "token_endpoint_auth_methods_supported": ["client_secret_post", "client_secret_basic", "private_key_jwt", "none"], "userinfo_signing_alg_values_supported": ["none", "RS256"], "id_token_signing_alg_values_supported": ["RS256"], "id_token_signed_response_alg": ["RS256"], "userinfo_signed_response_alg": ["RS256"], "request_parameter_supported": true, "request_uri_parameter_supported": true, "require_request_uri_registration": true, "claims_parameter_supported": false, "revocation_endpoint": `${window.appSettings.PROVIDER_ISSUER}/oauth2/revoke`, "backchannel_logout_supported": true, "backchannel_logout_session_supported": true, "frontchannel_logout_supported": true, "frontchannel_logout_session_supported": true, "end_session_endpoint": `${window.appSettings.PROVIDER_ISSUER}/oauth2/sessions/logout`, "request_object_signing_alg_values_supported": ["none", "RS256", "ES256"], "code_challenge_methods_supported": ["plain", "S256"] },


    client_id: window.appSettings.PROVIDER_CLIENT_ID,
    redirect_uri: url + "/index.html",
    post_logout_redirect_uri: url + "/index.html",
    response_type: "code",
    scope: "openid offline_access",
    response_mode: "query",
    filterProtocolClaims: true
};

export {
    Log,
    OidcClient
};
