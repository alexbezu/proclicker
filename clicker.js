var selectors = [{"selector":"body > div.header.header-logged-in.true > div > div > form > label > input", "action":"setParam", "param":"proclicker the best"},
    {"selector":"#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div:nth-child(2) > nav > span:nth-child(1) > a > span", "action":"click"},
    {"selector":"#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div:nth-child(2) > nav > span:nth-child(3) > a > span", "action":"click"},
    {"selector":"#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div:nth-child(2) > nav > a:nth-child(4)", "action":"click"},
    {"selector":"#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div:nth-child(2) > nav > a:nth-child(5)", "action":"click"}];

function clicker() {
    var clicks = Promise.resolve();
    selectors.map(function(param) {
        clicks = clicks.then(function() {
            return new Promise(function(resolve) {
                var waitIntervalId = setInterval(function () {
                    //choke confirmation window
                    window.confirm = function () { return true; };
                    switch (param.action) {
                        case "click" :
                            if (document.querySelectorAll(param.selector).length) {
                                document.querySelector(param.selector).click();
                                clearInterval(waitIntervalId);
                                resolve();
                            }
                            break;
                        case "setParam" :
                            if (document.querySelectorAll(param.selector).length) {
                                document.querySelector(param.selector).value = param.param;
                                clearInterval(waitIntervalId);
                                resolve();
                            }
                            break;
                        case "waitAppear" :
                            if (document.querySelectorAll(param.selector).length) {
                                clearInterval(waitIntervalId);
                                resolve();
                            }
                            break;
                        case "waitClose" :
                            if (!document.querySelectorAll(param.selector).length) {
                                clearInterval(waitIntervalId);
                                resolve();
                            }
                            break;
                        default:
                            window.alert("wrong action: " + param.action);
                            clearInterval(waitIntervalId);
                            resolve();
                            break;
                    }
                }, 300);
            });
        });
    });
    return clicks;
}

clicker ();