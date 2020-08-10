const PANEL_CLASS_NAME = "css-1dbjc4n r-1u4rsef r-9cbz99 r-1ylenci r-1phboty r-rs99b7 r-ku1wi2 r-1udh08x"
const FEED_CONTAINER_CLASS_NAME = "css-1dbjc4n r-1jgb5lz r-1ye8kvj r-13qz1uu"
const FEED_LABEL = '[aria-label="Timeline: Your Home Timeline"]'


const port = chrome.runtime.connect({ name: "TwitterFocus" });


port.onMessage.addListener(function (msg) {
    if (msg.status === "focus") {
        blockFeedPanel()
    } else if (msg.status === "un-focus") {
        setContentVisibility(true);
    }
});


function setContentVisibility (makeVisible) {
    if (makeVisible) {
        document.getElementsByClassName(PANEL_CLASS_NAME)[0].style.visibility = "visible";
        document.querySelector(FEED_LABEL).style.visibility = "visible";
       
        var quote = document.getElementsByClassName(FEED_CONTAINER_CLASS_NAME)[1].children[0] 
        quote.remove();
    
    } else {
        document.getElementsByClassName(PANEL_CLASS_NAME)[0].style.visibility = "hidden";
        document.querySelector(FEED_LABEL).style.visibility = "hidden"
        fillQuote();
    }
}

var intervalId;

function blockFeedPanel () {
    function tryBlockingFeedPanel () {
        if (!isBlocked()) {
            setContentVisibility(false)
            clearInterval(intervalId)
        }
        return
    }

    if (hasLoaded()) {
        setContentVisibility(false)
    } else {
        intervalId = setInterval(tryBlockingFeedPanel, 2000)
    }
}

function fillQuote () {
    var quote = quotes[Math.floor(Math.random() * quotes.length)];

    const quoteStyle = "style=\"color:#293E4A;font-size:20px;\margin-bottom:4px;margin-left:10px;\""
    const tfTitleStyle = "style=\"color:#1DA1F2;font-size:28px;font-weight:700;margin-bottom:16px; margin-left:10px;\""
    const quoteSourceStyle = "style=\"color:#293E4A;font-size:20px;font-style:italic;margin-bottom:16px;margin-left:10px;\""
    const instructionStyle = "style=\"color:#293E4A;font-size:16px;\margin-bottom:4px;margin-left:10px;\""
    const instruction = "To exit focus mode, click on the Twitter Focus extension:"

    var linkedInFocusHTML = "<h1 " + tfTitleStyle + ">Twitter Focus</h1>"
    linkedInFocusHTML += "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"></link>"
    linkedInFocusHTML += "<p " + quoteStyle + ">" + quote.text + "</p>"
    linkedInFocusHTML += "<p " + quoteSourceStyle + ">- " + quote.source + "</p>"
    linkedInFocusHTML += "<p " + instructionStyle + ">" + instruction

    const quoteHtmlNode = document.createElement("div")
    quoteHtmlNode.innerHTML = linkedInFocusHTML

    document.getElementsByClassName(FEED_CONTAINER_CLASS_NAME)[1].prepend(quoteHtmlNode)
    document.getElementsByClassName(FEED_CONTAINER_CLASS_NAME)[1].style.fontFamily = "Arial, Helvetica";

}
function isBlocked () {
    if (!hasLoaded()) {
        return false
    } else {
        return document.getElementsByClassName(PANEL_CLASS_NAME)[0].style.visibility == "hidden"

    }
}
function hasLoaded () {
    return document.getElementsByClassName(PANEL_CLASS_NAME)[0] && document.getElementsByClassName(FEED_CONTAINER_CLASS_NAME)[1];
}





