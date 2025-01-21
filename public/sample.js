import { OidcClient, settings } from "./sample-settings.js";

document.getElementById("signin").addEventListener("click", signin, false);

function log() {
    document.getElementById("out").innerText = "";

    Array.prototype.forEach.call(arguments, function (msg) {
        if (msg instanceof Error) {
            msg = "Error: " + msg.message;
        }
        else if (typeof msg !== "string") {
            msg = JSON.stringify(msg, null, 2);
        }
        document.getElementById("out").innerHTML += msg + "\r\n";
    });
}

var client = new OidcClient(settings);

function signin() {
    var optionalArgs = {
        state: { bar: 15 }
    };
    client.createSigninRequest(optionalArgs).then(function (req) {
        log("signin request", req, "<a href='" + req.url + "'>go signin</a>");
        window.location = req.url;
    }).catch(function (err) {
        console.error(err);
        log(err);
    });
}

var signinResponse;
function processSigninResponse() {
    client.processSigninResponse(window.location.href).then(function (response) {
        signinResponse = response;
        log("signin response", signinResponse);
    }).catch(function (err) {
        console.error(err);
        log(err);
    });
}

function removeAllQueryParams() {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, document.title, url.toString());
}

(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    if (code) {
        processSigninResponse(code);
        removeAllQueryParams();
    } else if (error) {
        log("signin error response", { error: error, error_description: urlParams.get('error_description') });
        removeAllQueryParams();
    }
})();

export {
    log
};
