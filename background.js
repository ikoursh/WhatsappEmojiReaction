
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if( details.url.includes("web.whatsapp.com/bootstrap_main") && details.url.endsWith(".js") )
            return {redirectUrl:  chrome.extension.getURL("injected.js") };
        if (details.url.includes("web.whatsapp.com/serviceworker.js"))
            return {redirectUrl:  chrome.extension.getURL("serviceworker.js") };

    },
    {urls: ["http://*/*", "https://*/*"]}, ["blocking"]);




var onHeadersReceived = function (details) {

    for (var i = 0; i < details.responseHeaders.length; i++) {
        if (details.responseHeaders[i].name.toLowerCase() === 'content-security-policy') {
            details.responseHeaders[i].value = '';
            console.log(details.responseHeaders[i].value, "removed");
        }
    }

    return {
        responseHeaders: details.responseHeaders
    };
};


var init = function () {

    // When Chrome recieves some headers
    var onHeaderFilter = { urls: ['*://web.whatsapp.com/*'], types: ['main_frame', 'sub_frame'] };
    chrome.webRequest.onHeadersReceived.addListener(
        onHeadersReceived, onHeaderFilter, ['blocking', 'responseHeaders']
    );

};



init();
