var modeToggle, rocToggle;

switch (localStorage.getItem("mode")) {
case "true":
    modeToggle = true;
    break;

case "false":
    modeToggle = false;
    break;

case null:
    modeToggle = true;
    break;
}

switch (localStorage.getItem("roc")) {
    case "true":
        rocToggle = true;
        break;
    
    case "false":
        rocToggle = false;
        break;
    
    case null:
        rocToggle = true;
        break;
}

var optionsToggle = false;

toggleElement("mode", modeToggle, "switchMode", ":)", ":(");
toggleElement("roc", rocToggle, "ROC", "refresh on close: ON", "refresh on close: OFF");
generateWord();

document.addEventListener("click", function(e) {
    if(e.target.classList.contains("refresh")){
        generateWord();
        if(!rocToggle){ generateWord("clicked"); }
    }

    if(e.target.classList.contains("switchMode")){
        modeToggle = !modeToggle;
        toggleElement("mode", modeToggle, "switchMode", ":)", ":(");
    }

    if(e.target.classList.contains("settings")){
        optionsToggle = !optionsToggle;

        if(optionsToggle) {
            document.getElementById("bot").style.display = "none";
            document.getElementById("info").style.display = "block";
        }
        else{
            document.getElementById("bot").style.display = "flex";
            document.getElementById("info").style.display = "none";
        }
    }

    if(e.target.classList.contains("ROC")){
        rocToggle = !rocToggle;
        toggleElement("roc", rocToggle, "ROC", "refresh on close: ON", "refresh on close: OFF");
    }
});

function generateWord(refreshROC = "notClicked"){
    var text, botQuote, mode;

    switch (modeToggle) {
        case true:
            mode = "politeWords"
            break;

        case false:
            mode = "unpoliteWords"
            break;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            botQuote = this.responseText;
            botQuote = botQuote.split(";");
            botQuote = botQuote.filter((a) => a);

            if(rocToggle | refreshROC == "clicked"){
                randNum = Math.floor(Math.random() * botQuote.length);
                localStorage.setItem("randNum", randNum);
                text = botQuote[randNum];
            }
            else{
                text = botQuote[parseInt(localStorage.getItem("randNum"))];
            }

            document.getElementById("botText").textContent = text;

            console.log(botQuote);

            console.log(parseInt(localStorage.getItem("randNum")));
        }
    };
    xhttp.open("GET", "http://malgow.net/-----/---.php?mode="+mode, true);
    xhttp.send();
}

function toggleElement(lsItem, bool, id, t, f){
    localStorage.setItem(lsItem, bool);
    if(bool) document.getElementById(id).textContent = t;
    else{ document.getElementById(id).textContent = f; }
}