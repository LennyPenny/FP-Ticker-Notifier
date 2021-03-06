// ==UserScript==
// @name         FP Ticker Notifier
// @namespace    facepunch.com
// @include       *facepunch.com/fp_ticker*
// @version      0.4
// @description  Notifies you of new posts in threads you read while you have the ticker open
// @author       Lennart Bernhardt (github.com/LennyPenny)
// @updateURL    https://github.com/LennyPenny/FP-Ticker-Notifier/raw/master/fp_TickerNotifier.user.js
// @downloadURL  https://github.com/LennyPenny/FP-Ticker-Notifier/raw/master/fp_TickerNotifier.user.js
// @grant        GM_notification
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    'use strict';

    console.log("Starting ticker notifier");
    var OldAddTickerPost = AddTickerPost;
    setTimeout(function() { //hope you have a fast enough connection
        AddTickerPost = function(post) {
            if (post.attributes.getNamedItem( "html" ).value.includes("Last Read")){
                //this is probably a shitty way to do this
                var el = document.createElement("html");
                el.innerHTML = post.attributes.getNamedItem( "html" ).value;
                var links = el.getElementsByTagName("a");

                if (links !== undefined)
                    GM_notification(links[links.length-2].innerHTML, "New post by " + links[links.length-3].innerHTML, "https://facepunch.com/fp/forums/6.png", function() {
                        GM_openInTab(links[links.length-1].href);
                    });
            }
            OldAddTickerPost(post);
        };
    }, 1000);
})();
