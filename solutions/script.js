
function httpGet(url){
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // synchronous
    xmlHttp.send();
    return {
        code: xmlHttp.status,
        text: xmlHttp.responseText
    }
}

function loadJSON(url){
    let t = (new Date()).getTime() / 1000;
    url += "?timestamp=" + t;
    res = httpGet(url);
    return JSON.parse(res.text);
}

// SHOW ALERTS

let t = (new Date()).getTime() / 1000;
let alertRes = httpGet("alert.txt?timestamp=" + t);
if (alertRes.code == 200 && alertRes.text != ""){
    let alertCode = `<div style="width: 100%; background-color: yellow; color: black; margin-bottom: 10px; padding: 2px">` + alertRes.text + "</div>";
    document.body.innerHTML = alertCode + document.body.innerHTML;
}


