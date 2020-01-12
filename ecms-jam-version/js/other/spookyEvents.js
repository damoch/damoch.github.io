const spookyEvents = [distortTitle, printSpookyTextToLog, openSpookyWindow, readSpookyText, openSpookyAlert, makeSpookyTitle, spookyBackground, playSpookySound, makeManySpookyTitles, makeManySpookyWindows];

function startRandomSpookyEvent(){
    spookyEvents[getRndInteger(0, spookyEvents.length)]();
}

function distortTitle(){
    var title = document.getElementById("title");
    var previousText = title.textContent;

    title.textContent = randomSpooky(true);
    setTimeout(function(){title.textContent = previousText}, 3000);
}

function printSpookyTextToLog(){
    printLog(randomSpooky(false));
}

function openSpookyWindow(){
    var speed = getRndInteger(5, 20);
    var rndX = getRndInteger(100, 500);
    var rndY = getRndInteger(100, 500);
    var win = window.open("", randomSpooky(false), "width=400,height=300");
    win.moveTo(rndX, rndY);
    var id = setInterval(function(){win.moveBy(1, 1);}, speed)
    
    setTimeout(function(){clearInterval(id); win.close()}, 5000);

    win.document.write(randomSpooky(true)); 
}

function readSpookyText(){
    var voice = window.speechSynthesis.getVoices().filter(function(voice){return voice.voiceURI.includes("English")})[0];
    var utr = new SpeechSynthesisUtterance(randomSpooky(false));
    utr.voice = voice;
    window.speechSynthesis.speak(utr);
}

function openSpookyAlert() {
    alert(randomSpooky(true));
}

function makeSpookyTitle(){
    var titles = document.getElementsByTagName("h2");
    var indx = getRndInteger(0, titles.length);
    var title = titles[indx];
    var spookyT = randomSpooky(true);
    var currTIndx = 0;
    var startingStr = title.textContent;
    title.style.color = "red";
    title.textContent = "";
    var id = setInterval(function(){
        title.textContent += spookyT[currTIndx++];
        if(currTIndx > spookyT.length - 1){
            setTimeout(function(){
                title.textContent = startingStr;
                title.style.color = "white";
            }, 3000);
            clearInterval(id);
        }
    }, 100);
}

function spookyBackground(){
    var defaultBackground = "white";
    document.body.style.color = "white";
    const defaultBodyClass = document.body.className;
    document.body.className = "spooky";
    var id = setInterval(flipBackgroundColors, 100);
    setTimeout(function(){
        clearTimeout(id); 
        document.body.style.backgroundColor = defaultBackground; 
        document.body.className = defaultBodyClass;
    }, 
    2000);

}

function makeManySpookyTitles(){
    var rnd = getRndInteger(2, 6);
    for(var i = 0; i < rnd; i++){
        makeSpookyTitle();
    }
}

function makeManySpookyWindows(){
    var rnd = getRndInteger(2, 6);
    for(var i = 0; i < rnd; i++){
        openSpookyWindow();
    }
}

function playSpookySound(){
    var audio = new Audio(randomSpookySound());
    spookyBackground();
    audio.play();
}
